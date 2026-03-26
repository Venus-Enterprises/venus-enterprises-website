import rawProducts from "@/config/products.json";
import type {
  ProductsCategory,
  ProductsConfig,
  ProductsPreviewVM
} from "@/shared/types/productsTypes";

function normalizeCategory(c: Partial<ProductsCategory>, idx: number): ProductsCategory {
  const name = c.name ?? `Category ${idx + 1}`;
  const slug = c.slug ?? name.toLowerCase().replace(/\s+/g, "-");
  const image = c.image ?? "/media/products/hero_slider/hydrochloric-acid-hcl-500x500.webp";
  return {
    name,
    slug,
    image,
    shortDescription: c.shortDescription ?? ""
  };
}

export function getProductsPreviewVM(): ProductsPreviewVM {
  const cfg = (rawProducts || {}) as Partial<ProductsConfig>;

  const preview = cfg.homepagePreview ?? {};
  const title = preview.title ?? "Our Products";
  const subtitle = preview.subtitle ?? "Browse our product categories";

  const allCats = (cfg.categories ?? []).map((c, i) => normalizeCategory(c as Partial<ProductsCategory>, i));
  const max = preview.maxCategories ?? 7; // Keep last tile for View All
  const categories = allCats.slice(0, Math.max(0, max));

  const viewAllLabel = preview.viewAllLabel ?? "View All Products";
  const viewAllHref = preview.viewAllHref ?? "/products";

  return {
    title,
    subtitle,
    categories,
    viewAllLabel,
    viewAllHref
  };
}
