"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { clinicGalleryImages } from "@/lib/clinic-gallery";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ClinicGallery() {
  const t = useTranslations("Home.clinicGallery");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="bg-(--background-secondary) py-12 text-foreground"
    >
      <div className="mx-auto max-w-6xl px-0">
        <div className="flex flex-col gap-2 px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-bold tracking-widest text-(--secondary-accent)">
            {t("kicker")}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>

          <p className="max-w-2xl text-sm font-semibold leading-7 text-(--foreground-secondary)">
            {t("subtitle")}
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-8 px-4 sm:px-6 lg:px-8"
        >
          <CarouselContent>
            {clinicGalleryImages.map((image) => (
              <CarouselItem key={image.id} className="sm:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-foreground/5">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label={t("previous")} />
          <CarouselNext aria-label={t("next")} />
        </Carousel>
      </div>
    </section>
  );
}
