export type HeaderLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HeaderContact = {
  phoneLabel: string;
  phoneNumber: string;
  emailLabel: string;
  emailAddress: string;
};

export type HeaderConfig = {
  logo: HeaderLogo;
  companyName: string;
  location: string;
  gstNo: string;
  contact: HeaderContact;
};

export type HeaderViewModel = HeaderConfig & {
  telHref: string;
  mailtoHref: string;
};