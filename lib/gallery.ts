export type GalleryBeforeAfter = {
  id: string;
  title: string;
  beforeImage: { src: string; alt: string };
  afterImage: { src: string; alt: string };
};

export const beforeAfterGallery = [
  {
    id: "gallery-1",
    title: "Saç çizgisi düzeltme",
    beforeImage: {
      src: "/images/gallery/before-1.jpeg",
      alt: "Uygulama öncesi görünüm (örnek)",
    },
    afterImage: {
      src: "/images/gallery/after-1.jpeg",
      alt: "Uygulama sonrası görünüm (örnek)",
    },
  },
  {
    id: "gallery-2",
    title: "Seyrelme ve homojen görünüm",
    beforeImage: {
      src: "/images/gallery/before-2.jpeg",
      alt: "Uygulama öncesi görünüm (örnek)",
    },
    afterImage: {
      src: "/images/gallery/after-2.jpeg",
      alt: "Uygulama sonrası görünüm (örnek)",
    },
  },
  {
    id: "gallery-3",
    title: "İz kapama (örnek)",
    beforeImage: {
      src: "/images/gallery/before-3.jpeg",
      alt: "Uygulama öncesi görünüm (örnek)",
    },
    afterImage: {
      src: "/images/gallery/after-3.jpeg",
      alt: "Uygulama sonrası görünüm (örnek)",
    },
  },
] satisfies GalleryBeforeAfter[];

