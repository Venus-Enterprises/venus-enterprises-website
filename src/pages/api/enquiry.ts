import type { NextApiRequest, NextApiResponse } from "next";

type QuickEnquiryPayload = {
  formType: "quick_enquiry";
  values: {
    name: string;
    message: string;
  };
  emailContent: {
    subject: string;
    title: string;
    intro: string;
    fieldLabels: {
      name: string;
      message: string;
      source: string;
    };
    sourceLabelValue: string;
  };
};

type ContactMessagePayload = {
  formType: "contact_message";
  values: {
    fullName: string;
    phone: string;
    email: string;
    message: string;
  };
  emailContent: {
    subject: string;
    title: string;
    intro: string;
    fieldLabels: {
      fullName: string;
      phone: string;
      email: string;
      message: string;
      source: string;
    };
    sourceLabelValue: string;
  };
};

type EnquiryPayload = QuickEnquiryPayload | ContactMessagePayload;

type ApiResponse = {
  success: boolean;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getMissingEnvironmentVariables() {
  const requiredVariables = [
    "GRAPH_TENANT_ID",
    "GRAPH_CLIENT_ID",
    "GRAPH_CLIENT_SECRET",
    "GRAPH_SENDER",
    "ENQUIRY_TO_EMAIL",
  ];

  return requiredVariables.filter((key) => !process.env[key]);
}

function validatePayload(payload: EnquiryPayload) {
  if (payload.formType === "quick_enquiry") {
    return Boolean(payload.values.name?.trim() && payload.values.message?.trim());
  }

  return Boolean(
    payload.values.fullName?.trim() &&
      payload.values.phone?.trim() &&
      payload.values.email?.trim() &&
      payload.values.message?.trim()
  );
}

function buildMailContent(payload: EnquiryPayload) {
  if (payload.formType === "quick_enquiry") {
    const labels = payload.emailContent.fieldLabels;
    const values = payload.values;

    return {
      subject: payload.emailContent.subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2>${escapeHtml(payload.emailContent.title)}</h2>
          <p>${escapeHtml(payload.emailContent.intro)}</p>
          <p><strong>${escapeHtml(labels.name)}:</strong> ${escapeHtml(values.name)}</p>
          <p><strong>${escapeHtml(labels.message)}:</strong><br/>${escapeHtml(values.message).replace(/\n/g, "<br/>")}</p>
          <p><strong>${escapeHtml(labels.source)}:</strong> ${escapeHtml(payload.emailContent.sourceLabelValue)}</p>
        </div>
      `,
    };
  }

  const labels = payload.emailContent.fieldLabels;
  const values = payload.values;

  return {
    subject: payload.emailContent.subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>${escapeHtml(payload.emailContent.title)}</h2>
        <p>${escapeHtml(payload.emailContent.intro)}</p>
        <p><strong>${escapeHtml(labels.fullName)}:</strong> ${escapeHtml(values.fullName)}</p>
        <p><strong>${escapeHtml(labels.phone)}:</strong> ${escapeHtml(values.phone)}</p>
        <p><strong>${escapeHtml(labels.email)}:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>${escapeHtml(labels.message)}:</strong><br/>${escapeHtml(values.message).replace(/\n/g, "<br/>")}</p>
        <p><strong>${escapeHtml(labels.source)}:</strong> ${escapeHtml(payload.emailContent.sourceLabelValue)}</p>
      </div>
    `,
  };
}

async function getGraphAccessToken() {
  const tenantId = process.env.GRAPH_TENANT_ID!;
  const clientId = process.env.GRAPH_CLIENT_ID!;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET!;

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || "Failed to get Graph access token.");
  }

  return data.access_token as string;
}

async function sendMailWithGraph(payload: EnquiryPayload) {
  const accessToken = await getGraphAccessToken();
  const sender = process.env.GRAPH_SENDER!;
  const toEmail = process.env.ENQUIRY_TO_EMAIL!;

  const mailContent = buildMailContent(payload);

  const graphUrl = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`;

  const requestBody = {
    message: {
      subject: mailContent.subject,
      body: {
        contentType: "HTML",
        content: mailContent.html,
      },
      toRecipients: [
        {
          emailAddress: {
            address: toEmail,
          },
        },
      ],
      replyTo:
        payload.formType === "contact_message"
          ? [
              {
                emailAddress: {
                  address: payload.values.email,
                },
              },
            ]
          : [
              {
                emailAddress: {
                  address: sender,
                },
              },
            ],
    },
    saveToSentItems: true,
  };

  const response = await fetch(graphUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Graph sendMail failed: ${errorText}`);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  const missingVariables = getMissingEnvironmentVariables();
  if (missingVariables.length > 0) {
    return res.status(500).json({
      success: false,
      message: `Email server is not configured properly. Missing: ${missingVariables.join(", ")}`,
    });
  }

  const payload = req.body as EnquiryPayload;

  if (!payload?.formType || !payload?.values || !payload?.emailContent) {
    return res.status(400).json({
      success: false,
      message: "Invalid request payload.",
    });
  }

  if (!validatePayload(payload)) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  try {
    await sendMailWithGraph(payload);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Enquiry email send failed:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email.";

    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
}