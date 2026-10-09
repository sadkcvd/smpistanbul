import type { Locale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function FAQSection({ id, locale = "tr" }: { id?: string; locale?: Locale }) {
  const t = await getTranslations({ locale, namespace: "FAQ" });
  const items = [
    { id: "how-long", question: t("items.howLong.question"), answer: t("items.howLong.answer") },
    { id: "permanent", question: t("items.permanent.question"), answer: t("items.permanent.answer") },
    { id: "pain", question: t("items.pain.question"), answer: t("items.pain.answer") },
    {
      id: "who-should",
      question: t("items.whoShould.question"),
      answer: t("items.whoShould.answer"),
    },
    {
      id: "after-care",
      question: t("items.afterCare.question"),
      answer: t("items.afterCare.answer"),
    },
  ];

  return (
    <section id={id} aria-label={t("section.ariaLabel")} className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
            {t("section.kicker")}
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {t("section.title")}
          </h2>
          <p className="max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
            {t("section.subtitle")}
          </p>
        </div>

        <div className="mt-8">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

