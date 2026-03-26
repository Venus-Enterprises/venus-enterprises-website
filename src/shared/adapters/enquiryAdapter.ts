import enquiryConfig from "@/config/enquiry.json";
import type { EnquiryConfig, EnquiryVM } from "@/shared/types/enquiryTypes";

const DEFAULTS: EnquiryConfig = {
  enabled: true,
  backgroundColor: "#eef2f6",
  cardBackgroundColor: "#1E3A8A",
  heading: "Tell us what you need",
  apiEndpoint: "/api/enquiry",
  successMessage: "Thanks! We received your enquiry. We will contact you shortly.",
  errorMessage: "Sorry, we could not send your enquiry now. Please try again.",
  submittingText: "Sending...",
  formType: "quick_enquiry",
  submitButton: {
    text: "Send Enquiry"
  },
  fields: {
    name: {
      label: "Name",
      placeholder: "Enter your name",
      requiredMessage: "Name is required."
    },
    message: {
      label: "Requirement",
      placeholder: "Kindly describe your requirement",
      requiredMessage: "Requirement is required."
    }
  },
  emailContent: {
    subject: "Website Quick Enquiry",
    title: "New Quick Enquiry Received",
    intro: "A visitor submitted a quick enquiry from the website.",
    fieldLabels: {
      name: "Name",
      message: "Requirement",
      source: "Source"
    },
    sourceLabelValue: "Quick Enquiry Block"
  }
};

export function getEnquiryVM(): EnquiryVM {
  const cfg = (enquiryConfig || {}) as Partial<EnquiryConfig>;

  return {
    enabled: cfg.enabled ?? DEFAULTS.enabled,
    backgroundColor: cfg.backgroundColor || DEFAULTS.backgroundColor,
    cardBackgroundColor: cfg.cardBackgroundColor || DEFAULTS.cardBackgroundColor,
    heading: cfg.heading || DEFAULTS.heading,
    apiEndpoint: cfg.apiEndpoint || DEFAULTS.apiEndpoint,
    successMessage: cfg.successMessage || DEFAULTS.successMessage,
    errorMessage: cfg.errorMessage || DEFAULTS.errorMessage,
    submittingText: cfg.submittingText || DEFAULTS.submittingText,
    formType: cfg.formType || DEFAULTS.formType,
    submitButton: {
      text: cfg.submitButton?.text || DEFAULTS.submitButton.text
    },
    fields: {
      name: {
        label: cfg.fields?.name?.label || DEFAULTS.fields.name.label,
        placeholder: cfg.fields?.name?.placeholder || DEFAULTS.fields.name.placeholder,
        requiredMessage: cfg.fields?.name?.requiredMessage || DEFAULTS.fields.name.requiredMessage
      },
      message: {
        label: cfg.fields?.message?.label || DEFAULTS.fields.message.label,
        placeholder: cfg.fields?.message?.placeholder || DEFAULTS.fields.message.placeholder,
        requiredMessage:
          cfg.fields?.message?.requiredMessage || DEFAULTS.fields.message.requiredMessage
      }
    },
    emailContent: {
      subject: cfg.emailContent?.subject || DEFAULTS.emailContent.subject,
      title: cfg.emailContent?.title || DEFAULTS.emailContent.title,
      intro: cfg.emailContent?.intro || DEFAULTS.emailContent.intro,
      fieldLabels: {
        name:
          cfg.emailContent?.fieldLabels?.name || DEFAULTS.emailContent.fieldLabels.name,
        message:
          cfg.emailContent?.fieldLabels?.message || DEFAULTS.emailContent.fieldLabels.message,
        source:
          cfg.emailContent?.fieldLabels?.source || DEFAULTS.emailContent.fieldLabels.source
      },
      sourceLabelValue:
        cfg.emailContent?.sourceLabelValue || DEFAULTS.emailContent.sourceLabelValue
    }
  };
}
