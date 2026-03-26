import type { ContactUsConfig } from "@/shared/types/contactUsTypes";
import contactUsConfig from "@/config/contactUsConfig.json";

const DEFAULTS: ContactUsConfig = {
  pageTitle: "Contact Us",
  pageDescription:
    "Reach out to us for product enquiries, quotes, or any business requirements.",
  apiEndpoint: "/api/enquiry",
  successMessage: "Thanks! Your message has been sent successfully. We will contact you shortly.",
  errorMessage: "Sorry, we could not send your message now. Please try again.",
  submittingText: "Sending...",
  formType: "contact_message",
  breadcrumb: {
    items: []
  },
  contactDetails: {
    heading: "Contact Details",
    phoneLabel: "Phone",
    phone: "",
    emailLabel: "Email",
    email: "",
    addressLabel: "Address",
    companyName: "",
    addressLines: [],
    directionText: "Get Direction",
    directionUrl: ""
  },
  form: {
    heading: "Send us a message",
    submitText: "Send Message",
    fields: {
      fullName: {
        label: "Full Name",
        placeholder: "Enter your full name",
        requiredMessage: "Full name is required."
      },
      phone: {
        label: "Phone",
        placeholder: "Enter your phone number",
        requiredMessage: "Phone number is required.",
        invalidMessage: "Please enter a valid phone number."
      },
      email: {
        label: "Email",
        placeholder: "Enter your email address",
        requiredMessage: "Email is required.",
        invalidMessage: "Please enter a valid email address."
      },
      message: {
        label: "Message",
        placeholder: "Type your message",
        requiredMessage: "Message is required."
      }
    }
  },
  emailContent: {
    subject: "Website Contact Message",
    title: "New Contact Message Received",
    intro: "A visitor submitted the contact form from the website.",
    fieldLabels: {
      fullName: "Full Name",
      phone: "Phone",
      email: "Email",
      message: "Message",
      source: "Source"
    },
    sourceLabelValue: "Contact Us Page"
  },
  map: {
    heading: "Our Location",
    embedUrl: ""
  }
};

export function getContactUsConfig(): ContactUsConfig {
  const cfg = contactUsConfig as Partial<ContactUsConfig>;

  return {
    pageTitle: cfg.pageTitle || DEFAULTS.pageTitle,
    pageDescription: cfg.pageDescription || DEFAULTS.pageDescription,
    apiEndpoint: cfg.apiEndpoint || DEFAULTS.apiEndpoint,
    successMessage: cfg.successMessage || DEFAULTS.successMessage,
    errorMessage: cfg.errorMessage || DEFAULTS.errorMessage,
    submittingText: cfg.submittingText || DEFAULTS.submittingText,
    formType: cfg.formType || DEFAULTS.formType,
    breadcrumb: {
      items: Array.isArray(cfg.breadcrumb?.items) ? cfg.breadcrumb.items : DEFAULTS.breadcrumb.items
    },
    contactDetails: {
      heading: cfg.contactDetails?.heading || DEFAULTS.contactDetails.heading,
      phoneLabel: cfg.contactDetails?.phoneLabel || DEFAULTS.contactDetails.phoneLabel,
      phone: cfg.contactDetails?.phone || DEFAULTS.contactDetails.phone,
      emailLabel: cfg.contactDetails?.emailLabel || DEFAULTS.contactDetails.emailLabel,
      email: cfg.contactDetails?.email || DEFAULTS.contactDetails.email,
      addressLabel: cfg.contactDetails?.addressLabel || DEFAULTS.contactDetails.addressLabel,
      companyName: cfg.contactDetails?.companyName || DEFAULTS.contactDetails.companyName,
      addressLines: cfg.contactDetails?.addressLines || DEFAULTS.contactDetails.addressLines,
      directionText: cfg.contactDetails?.directionText || DEFAULTS.contactDetails.directionText,
      directionUrl: cfg.contactDetails?.directionUrl || DEFAULTS.contactDetails.directionUrl
    },
    form: {
      heading: cfg.form?.heading || DEFAULTS.form.heading,
      submitText: cfg.form?.submitText || DEFAULTS.form.submitText,
      fields: {
        fullName: {
          label: cfg.form?.fields?.fullName?.label || DEFAULTS.form.fields.fullName.label,
          placeholder:
            cfg.form?.fields?.fullName?.placeholder ||
            DEFAULTS.form.fields.fullName.placeholder,
          requiredMessage:
            cfg.form?.fields?.fullName?.requiredMessage ||
            DEFAULTS.form.fields.fullName.requiredMessage
        },
        phone: {
          label: cfg.form?.fields?.phone?.label || DEFAULTS.form.fields.phone.label,
          placeholder:
            cfg.form?.fields?.phone?.placeholder || DEFAULTS.form.fields.phone.placeholder,
          requiredMessage:
            cfg.form?.fields?.phone?.requiredMessage ||
            DEFAULTS.form.fields.phone.requiredMessage,
          invalidMessage:
            cfg.form?.fields?.phone?.invalidMessage || DEFAULTS.form.fields.phone.invalidMessage
        },
        email: {
          label: cfg.form?.fields?.email?.label || DEFAULTS.form.fields.email.label,
          placeholder:
            cfg.form?.fields?.email?.placeholder || DEFAULTS.form.fields.email.placeholder,
          requiredMessage:
            cfg.form?.fields?.email?.requiredMessage ||
            DEFAULTS.form.fields.email.requiredMessage,
          invalidMessage:
            cfg.form?.fields?.email?.invalidMessage || DEFAULTS.form.fields.email.invalidMessage
        },
        message: {
          label: cfg.form?.fields?.message?.label || DEFAULTS.form.fields.message.label,
          placeholder:
            cfg.form?.fields?.message?.placeholder || DEFAULTS.form.fields.message.placeholder,
          requiredMessage:
            cfg.form?.fields?.message?.requiredMessage ||
            DEFAULTS.form.fields.message.requiredMessage
        }
      }
    },
    emailContent: {
      subject: cfg.emailContent?.subject || DEFAULTS.emailContent.subject,
      title: cfg.emailContent?.title || DEFAULTS.emailContent.title,
      intro: cfg.emailContent?.intro || DEFAULTS.emailContent.intro,
      fieldLabels: {
        fullName:
          cfg.emailContent?.fieldLabels?.fullName ||
          DEFAULTS.emailContent.fieldLabels.fullName,
        phone:
          cfg.emailContent?.fieldLabels?.phone || DEFAULTS.emailContent.fieldLabels.phone,
        email:
          cfg.emailContent?.fieldLabels?.email || DEFAULTS.emailContent.fieldLabels.email,
        message:
          cfg.emailContent?.fieldLabels?.message || DEFAULTS.emailContent.fieldLabels.message,
        source:
          cfg.emailContent?.fieldLabels?.source || DEFAULTS.emailContent.fieldLabels.source
      },
      sourceLabelValue:
        cfg.emailContent?.sourceLabelValue || DEFAULTS.emailContent.sourceLabelValue
    },
    map: {
      heading: cfg.map?.heading || DEFAULTS.map.heading,
      embedUrl: cfg.map?.embedUrl || DEFAULTS.map.embedUrl
    }
  };
}
