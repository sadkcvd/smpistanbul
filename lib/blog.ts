export type BlogPostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  dateISO: string;
  readingMinutes: number;
  coverImage: { src: string; alt: string };
  tags: string[];
  blocks: BlogPostBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "smp-nedir-ve-kimlere-uygundur",
    title: "SMP Nedir? Kimlere Uygundur?",
    excerpt:
      "Scalp Micropigmentation (SMP) ile saç çizgisi ve yoğunluk nasıl geri kazanılır? İstanbul’da değerlendirme süreci nasıl ilerler?",
    dateISO: "2026-02-12",
    readingMinutes: 6,
    coverImage: {
      src: "/images/blog/cover-1.jpeg",
      alt: "SMP süreci görseli (örnek)",
    },
    tags: ["SMP", "Rehber"],
    blocks: [
      {
        type: "p",
        text: "SMP (Scalp Micropigmentation), cilt üzerinde mikro pigment noktaları oluşturarak saç görünümünü simüle eden bir uygulamadır. Uygulamanın başarısı; doğru pigment seçimi, doğru yoğunluk planı ve tekniğe bağlıdır.",
      },
      {
        type: "h2",
        text: "Kimler değerlendirme için uygundur?"
      },
      {
        type: "ul",
        items: [
          "Erkek tipi kellik ve seyrelme yaşayanlar",
          "Saç çizgisi düzeltmek isteyenler",
          "Saç ekimi sonrası iz görünümünü azaltmak isteyenler",
        ],
      },
      {
        type: "quote",
        text: "Doğru adaylık, doğru planlamayla birleştiğinde sonuçlar belirginleşir."
      },
      {
        type: "p",
        text: "İstanbul’da ilk görüşmede fotoğraflarla ön değerlendirme yapılır; hedef bölge belirlenir ve seans planı netleştirilir.",
      },
    ],
  },
  {
    slug: "oncesi-sonrasi-ne-beklemeli",
    title: "Öncesi / Sonrası: İlk Haftalarda Ne Beklemeli?",
    excerpt:
      "SMP sonrası iyileşme sürecinde pigment nasıl oturur? İlk günler ve bakım önerileri neler?",
    dateISO: "2026-01-28",
    readingMinutes: 5,
    coverImage: {
      src: "/images/blog/cover-2.jpeg",
      alt: "İyileşme süreci görseli (örnek)",
    },
    tags: ["Bakım", "SMP"],
    blocks: [
      {
        type: "p",
        text: "SMP sonrası ilk günlerde renk daha yoğun görünebilir. Bu, cildin iyileşme süreciyle birlikte zamanla dengelenir.",
      },
      { type: "h2", text: "Bakımın 3 temel kuralı" },
      {
        type: "ul",
        items: [
          "Nazik temizlik: sert kese/ürünlerden kaçın",
          "Güneşten korunma: pigmentin matlaşma hızını etkiler",
          "Seans sonrası talimatlara tam uyum",
        ],
      },
      {
        type: "p",
        text: "Bakım planı kişiye göre hazırlanır. Soru/geri bildirim için randevu sonrası iletişim kanallarımız açıktır.",
      },
    ],
  },
  {
    slug: "sac-simulasyonu-ile-hacim-artisi",
    title: "Saç Simülasyonu ile Hacim Artışı Nasıl Hedeflenir?",
    excerpt:
      "Sac Simulasyonu (saç simülasyonu) seansında yoğunluk dağılımı nasıl planlanır? Doğal ve homojen görünüm için ipuçları.",
    dateISO: "2025-12-10",
    readingMinutes: 7,
    coverImage: {
      src: "/images/blog/cover-3.jpeg",
      alt: "Saç simülasyonu görseli (örnek)",
    },
    tags: ["Sac Simulasyonu", "İstanbul"],
    blocks: [
      {
        type: "p",
        text: "Sac Simulasyonu, mevcut saçların görünümünü desteklemek ve boşluk/hacim etkisini optimize etmek için planlanır. Amaç; saçın doğal çizgisiyle uyumlu, geçişleri yumuşak bir görünüm oluşturmaktır.",
      },
      {
        type: "h2",
        text: "Planlamada neler dikkate alınır?"
      },
      {
        type: "ul",
        items: [
          "Işık altında görünüm (günlük kullanım senaryoları)",
          "Saçın doğal yönde dağılımı",
          "Cilt tonu ve pigment uyumu",
        ],
      },
      {
        type: "p",
        text: "İstanbul’daki danışmanlık sürecinde hedef bölge haritalanır; seans öncesi ve sonrası beklentiler birlikte belirlenir.",
      },
    ],
  },
] satisfies BlogPost[];

