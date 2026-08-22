export const siteConfig = {
  name: "SMP Istanbul",
  shortName: "SMP Istanbul",
  description:
    "Scalp Micropigmentation (SMP) ile doğal saç görünümü. İstanbul’da erkek tipi kellik, seyrelme ve iz kapama için randevu al.",
  // Update in production via NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.smpistanbul.com",
  locale: "tr-TR",
  currency: "TRY",
  // Update these via env in production
  phoneDisplay: "+90 (555) 000 00 00",
  phoneE164: process.env.NEXT_PUBLIC_PHONE_E164 ?? "+905550000000",
  whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "+905550000000",
  whatsappText: "Merhaba, SMP Istanbul’dan saç simülasyonu hakkında bilgi almak istiyorum. Uygulama süreci, uygunluk ve fiyatlandırma hakkında bilgi alabilir miyim?",
  address: "İstanbul, Türkiye",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@example.com",
  brandAccent: "#7c3aed",
} as const;

