export type FooterLink = {
  label: string;
  href: string;
};

export type FooterConfig = {
  brand: {
    logo: { src: string; alt: string; width: number; height: number };
    companyName: string;
    tagline: string;
    summary: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapUrl: string;
  };
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  businessInfo: {
    title: string;
    items: { label: string; value: string }[];
  };
  policyLinks?: {
    links: FooterLink[];
  };
  bottomBar: {
    copyright: string;
    note: string;
  };
};

export type FooterVM = {
  brand: FooterConfig["brand"];
  contact: FooterConfig["contact"];
  quickLinks: FooterConfig["quickLinks"];
  businessInfo: FooterConfig["businessInfo"];
  policyLinks?: FooterConfig["policyLinks"];
  copyrightText: string;
  noteText: string;
};