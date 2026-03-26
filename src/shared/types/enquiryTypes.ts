export type EnquiryFieldConfig = {
  label: string;
  placeholder: string;
  requiredMessage: string;
};

export type EnquiryEmailContentConfig = {
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

export type EnquiryConfig = {
  enabled: boolean;
  backgroundColor: string;
  cardBackgroundColor: string;
  heading: string;
  apiEndpoint: string;
  successMessage: string;
  errorMessage: string;
  submittingText: string;
  formType: string;
  submitButton: {
    text: string;
  };
  fields: {
    name: EnquiryFieldConfig;
    message: EnquiryFieldConfig;
  };
  emailContent: EnquiryEmailContentConfig;
};

export type EnquiryVM = EnquiryConfig;
