import Image from "next/image";
import { HeroVideo, type HeroVideoSources } from "@/components/media/HeroVideo";
import { HeroHeadline } from "@/components/sections/HeroHeadline";

export function HeroSection({
  kicker,
  title,
  subtitle,
  heroImageSrc,
  primaryHref,
  primaryLabel,
  videoSources,
  videoPoster,
  youtubeUrl,
  watchLabel,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  heroImageSrc?: string;
  primaryHref?: string;
  primaryLabel?: string;
  videoSources?: HeroVideoSources;
  videoPoster?: string;
  youtubeUrl?: string;
  watchLabel?: string;
}) {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0 -z-10">
        {videoSources && videoPoster ? (
          <>
            <HeroVideo sources={videoSources} poster={videoPoster} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/55 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </>
        ) : null}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-(--brand-accent)/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-(--brand-accent)/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <HeroHeadline
            kicker={kicker}
            title={title}
            subtitle={subtitle}
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            youtubeUrl={youtubeUrl}
            watchLabel={watchLabel}
          />

          {heroImageSrc ? (
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-(--border) bg-(--surface) shadow-xl shadow-black/15">
              <Image
                src={heroImageSrc}
                alt="Hero görseli (örnek)"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="eager"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-(--border)" />
            </div>
          ) : (
            <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-6">
              <div className="text-sm font-bold text-foreground/80">
                Ön Değerlendirme
              </div>
              <ul className="mt-3 list-disc pl-5 text-sm font-semibold leading-7 text-foreground/70">
                <li>Fotoğraflarla durum analizi</li>
                <li>Hedef alan planlama</li>
                <li>Renk/yoğunluk simülasyonu</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

