"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";

function toWhatsAppHref(whatsAppE164: string) {
  const digits = whatsAppE164.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(
    siteConfig.whatsappText
  )}`;
}

export function WhatsAppFloatingButton() {
  const t = useTranslations("Contact");
  const href = toWhatsAppHref(siteConfig.whatsappE164);

  return (
    <Button
      asChild
      variant="wp"
      size="lg"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-2xl p-0 shadow-lg text-white"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsappAria")}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </Button>
  );
}

