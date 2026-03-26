export type BreadcrumbItem = { label: string; href: string };

export type ContactDetails = {
  heading: string;
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  addressLabel: string;
  companyName: string;
  addressLines: string[];
  directionText: string;
  directionUrl: string;
};

export type FieldConfig = {
  label: string;
  placeholder: string;
  requiredMessage: string;
  invalidMessage?: string;
};

export type ContactFormConfig = {
  heading: string;
  submitText: string;
  fields: {
    fullName: FieldConfig;
    phone: FieldConfig;
    email: FieldConfig;
    message: FieldConfig;
  };
};

export type MapConfig = {
  heading: string;
  embedUrl: string;
};

export type ContactEmailContentConfig = {
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

export type ContactUsConfig = {
  pageTitle: string;
  pageDescription: string;
  apiEndpoint: string;
  successMessage: string;
  errorMessage: string;
  submittingText: string;
  formType: string;
  breadcrumb: { items: BreadcrumbItem[] };
  contactDetails: ContactDetails;
  form: ContactFormConfig;
  emailContent: ContactEmailContentConfig;
  map: MapConfig;
};
