import rawHeader from "@/config/header.json";
import type { HeaderConfig, HeaderViewModel } from "@/shared/types/headerTypes";

export function getHeaderVM(): HeaderViewModel {
  const cfg = (rawHeader || {}) as Partial<HeaderConfig>;

  const logo = cfg.logo ?? {
    src: "/media/header/logo.webp",
    alt: "Venus Enterprises Logo",
    width: 48,
    height: 48
  };

  const companyName = cfg.companyName ?? "Venus Enterprises";
  const location = cfg.location ?? "";
  const gstNo = cfg.gstNo ?? "";

  const contact = cfg.contact ?? {
    phoneLabel: "Call",
    phoneNumber: "",
    emailLabel: "Email",
    emailAddress: ""
  };

  const telHref = contact.phoneNumber ? `tel:${contact.phoneNumber.replace(/\s+/g, "")}` : "#";
  const mailtoHref = contact.emailAddress ? `mailto:${contact.emailAddress}` : "#";

  return { logo, companyName, location, gstNo, contact, telHref, mailtoHref };
}