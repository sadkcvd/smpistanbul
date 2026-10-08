import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start gap-6 px-4 py-16 sm:px-6">
      <div className="text-sm font-bold tracking-widest text-(--brand-accent)">
        404
      </div>
      <h1 className="text-3xl font-black tracking-tight">Sayfa bulunamadı</h1>
      <p className="text-sm font-semibold text-foreground/70">
        Aradığınız içerik kaldırılmış olabilir veya URL hatalı olabilir.
      </p>
      <Link
        href="/"
        className="rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background hover:opacity-90"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}

