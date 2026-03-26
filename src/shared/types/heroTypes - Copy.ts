export type HeroNavLink = { label: string; href: string };

export type HeroCompanyItem = {
  label: string;
  value: string;
};

export type HeroSliderItem = {
  title: string;
  subtitle?: string;
  image: string;
};

export type HeroConfig = {
  layout?: { leftPercent?: number; rightPercent?: number };

  leftNav?: { links?: HeroNavLink[] };

  companyInfo?: {
    title?: string;
    items?: HeroCompanyItem[];
    address?: string;
    mapUrl?: string;
    summary?: string;
  };

  rightPanel?: {
    search?: { placeholder?: string };
    slider?: { items?: HeroSliderItem[] };
  };
};

export type HeroVM = {
  leftPercent: number;
  rightPercent: number;

  links: HeroNavLink[];

  companyTitle: string;
  companyItems: HeroCompanyItem[];
  companyAddress: string;
  companyMapUrl: string;
  companySummary: string;

  searchPlaceholder: string;

  sliderItems: { title: string; subtitle: string; image: string }[];
};