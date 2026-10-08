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
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+90 (555) 000 00 00",
  phoneE164: process.env.NEXT_PUBLIC_PHONE_E164 ?? "+905550000000",
  whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "+905550000000",
  whatsappText: "Merhaba, SMP Istanbul’dan saç simülasyonu hakkında bilgi almak istiyorum. Uygulama süreci, uygunluk ve fiyatlandırma hakkında bilgi alabilir miyim?",
  address: "Zorlu Center, Levazım, Koru Sokağı No:2, Ofis No:1, 34340 Beşiktaş/İstanbul",
  lat: 41.0672,
  lng: 29.0173,
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@example.com",
  // Set via env once a real clinic video is published; the hero "watch video"
  // button only renders when this is non-empty.
  heroYoutubeUrl: process.env.NEXT_PUBLIC_HERO_YOUTUBE_URL ?? "",
  brandAccent: "#C9A96A",
} as const;

