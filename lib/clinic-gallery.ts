export type ClinicGalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export const clinicGalleryImages: ClinicGalleryImage[] = [
  {
    id: "clinic-1",
    src: "/images/procedure-room-1.jpg",
    alt: "SMP Istanbul klinik tedavi odası",
  },
  {
    id: "clinic-2",
    src: "/images/procedure-room-2.jpg",
    alt: "SMP Istanbul klinik tedavi odası - farklı açı",
  },
  {
    id: "clinic-3",
    src: "/images/office-1.jpg",
    alt: "SMP Istanbul Ofis odası",
  },
  {
    id: "clinic-4",
    src: "/images/office-corridor-1.jpg",
    alt: "SMP Istanbul Ofis koridoru",
  },
];
