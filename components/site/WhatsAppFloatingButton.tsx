"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";

export function WhatsAppFloatingButton() {
  const t = useTranslations("Contact");
  const href = buildWhatsAppHref();

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

