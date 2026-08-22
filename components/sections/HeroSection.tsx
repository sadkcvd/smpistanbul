import Image from "next/image";

export function HeroSection({
  kicker,
  title,
  subtitle,
  heroImageSrc,
  primaryHref,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  heroImageSrc?: string;
  primaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--brand-accent)]/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-[var(--brand-accent)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <div className="text-sm font-bold tracking-widest text-[var(--brand-accent)]">
              {kicker}
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
              {subtitle}
            </p>

            {primaryHref ? (
              <div className="mt-6">
                <a
                  href={primaryHref}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--cta-gold)] px-6 py-3 text-sm font-bold shadow-sm transition hover:bg-[var(--cta-gold-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cta-gold)]/45 text-[var(--text-on-cta)]"
                >
                  Mesaj bırak
                </a>
              </div>
            ) : null}
          </div>

          {heroImageSrc ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/5">
              <Image
                src={heroImageSrc}
                alt="Hero görseli (örnek)"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                loading="eager"
                fetchPriority="high"
              />
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

