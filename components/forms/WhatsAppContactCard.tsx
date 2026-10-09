import { MessageCircle } from "lucide-react";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/site";

export function WhatsAppContactCard({
  id,
  className,
  heading,
  helperText,
  ctaLabel,
}: {
  id?: string;
  className?: string;
  heading?: string;
  helperText?: string;
  ctaLabel: string;
}) {
  const href = buildWhatsAppHref();

  return (
    <section id={id} className={className}>
      <div className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-6">
        <div className="mb-4">
          <h2 className="text-xl font-black tracking-tight text-foreground">
            {heading}
          </h2>
          <p className="mt-1 text-sm font-semibold text-foreground/70">
            {helperText}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--cta-wp) px-6 py-3.5 text-sm font-bold text-white transition hover:bg-(--cta-wp-hover)"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {ctaLabel}
        </a>

        <div className="mt-3 text-center text-xs font-semibold text-foreground/60">
          {siteConfig.phoneDisplay}
        </div>
      </div>
    </section>
  );
}
