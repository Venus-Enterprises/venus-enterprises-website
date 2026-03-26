import footerConfig from "@/config/footer.json";
import { FooterConfig, FooterVM } from "@/shared/types/footerTypes";

export function getFooterVM(): FooterVM {
  const cfg = footerConfig as FooterConfig;

  const year = new Date().getFullYear();
  const copyrightText =
    cfg.bottomBar?.copyright?.replace("{year}", String(year)) ?? "";

  return {
    brand: cfg.brand,
    contact: cfg.contact,
    quickLinks: cfg.quickLinks,
    businessInfo: cfg.businessInfo,
    policyLinks: cfg.policyLinks, // ✅ new
    copyrightText,
    noteText: cfg.bottomBar?.note ?? "",
  };
}