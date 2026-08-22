import { buildMetadata } from "@/lib/seo";
import { BeforeAfterGallery } from "@/components/gallery/BeforeAfterGallery";
import { localizedPath, normalizeLocale } from "@/lib/i18n";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const t = await getTranslations({ locale, namespace: "Gallery" });
  return buildMetadata({
    title: t("meta.title"),
    description: t("meta.description"),
    path: localizedPath("/gallery", locale),
  });
}

export default function GalleryPage() {
  return (
    <div>
      <BeforeAfterGallery />
    </div>
  );
}

