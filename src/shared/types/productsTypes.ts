export type ProductsCategory = {
  name: string;
  slug: string;
  image: string;
  shortDescription?: string;
};

export type ProductsPreviewConfig = {
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  maxCategories?: number;
};

export type ProductsConfig = {
  homepagePreview?: ProductsPreviewConfig;
  categories?: ProductsCategory[];
};

export type ProductsPreviewVM = {
  title: string;
  subtitle: string;
  categories: ProductsCategory[];
  viewAllLabel: string;
  viewAllHref: string;
};