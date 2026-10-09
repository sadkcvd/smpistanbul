import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  subtitle,
  className,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-(--border) bg-(--background-secondary) py-10",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
          {kicker}
        </div>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-foreground/70">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
