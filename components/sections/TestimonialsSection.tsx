import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/testimonials";
import { useTranslations } from "next-intl";

export function TestimonialsSection() {
  const t = useTranslations("Home.testimonials");

  return (
    <section
      aria-label={t("ariaLabel")}
      className="bg-background py-12 text-foreground"
    >
      <div className="mx-auto max-w-6xl px-0">
        <div className="flex flex-col gap-2 px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
            {t("kicker")}
          </div>

          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>

          <p className="max-w-2xl text-sm font-semibold leading-7 text-(--foreground-secondary)">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="border-(--border) bg-(--surface) p-5 text-foreground"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--brand-accent)/10 ring-1 ring-(--brand-accent)/20">
                  <span className="text-sm font-black text-(--brand-accent)">
                    {testimonial.avatarText}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-black text-foreground">
                    {testimonial.name}
                  </div>

                  <div className="text-xs font-semibold text-(--foreground-secondary)">
                    {testimonial.title}
                  </div>
                </div>
              </div>

              <div
                className="mt-3 text-sm font-semibold text-(--brand-accent)"
                aria-label={t("ratingLabel", {
                  rating: testimonial.rating,
                })}
              >
                {"★".repeat(testimonial.rating)}
              </div>

              <p className="mt-3 text-sm leading-7 text-(--foreground-secondary)">
                “{testimonial.quote}”
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
