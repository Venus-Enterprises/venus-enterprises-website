import rawHero from "@/config/hero.json";
import type { HeroConfig, HeroVM } from "@/shared/types/heroTypes";

export function getHeroVM(): HeroVM {
  const cfg = (rawHero || {}) as Partial<HeroConfig>;

  const leftPercent = cfg.layout?.leftPercent ?? 50;
  const rightPercent = cfg.layout?.rightPercent ?? 50;

  const leftBackgroundImage =
    cfg.backgrounds?.leftImage ?? "/media/products/hero_images/hero-bg1.jpg";
  const rightBackgroundImage =
    cfg.backgrounds?.rightImage ?? "/media/products/hero_images/hero-bg2.jpg";

  const links =
    cfg.leftNav?.links ?? [
      { label: "About Us", href: "/about-us" },
      { label: "Our Products", href: "/products" },
      { label: "Contact Us", href: "/contact-us" }
    ];

  const companyTitle = cfg.companyInfo?.title ?? "About Company";
  const companyItems = cfg.companyInfo?.items ?? [];
  const companyAddress = cfg.companyInfo?.address ?? "";
  const companyMapUrl = cfg.companyInfo?.mapUrl ?? "";
  const companySummary = cfg.companyInfo?.summary ?? "";

  const searchPlaceholder =
    cfg.rightPanel?.search?.placeholder ?? "Search products...";

  const itemsRaw = cfg.rightPanel?.slider?.items ?? [];
  const sliderItems = itemsRaw.map((it) => ({
    title: it.title ?? "Product",
    subtitle: it.subtitle ?? "",
    image: it.image ?? "/media/products/sample-1.jpg"
  }));

  return {
    leftPercent,
    rightPercent,
    leftBackgroundImage,
    rightBackgroundImage,
    links,
    companyTitle,
    companyItems,
    companyAddress,
    companyMapUrl,
    companySummary,
    searchPlaceholder,
    sliderItems
  };
}