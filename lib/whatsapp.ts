import { siteConfig } from "@/lib/site";

export function buildWhatsAppHref(text: string = siteConfig.whatsappText) {
  const digits = siteConfig.whatsappE164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
