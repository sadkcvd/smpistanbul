import { ExternalLink, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";

type ClinicMapCardProps = {
  googleMapsLabel: string;
  appleMapsLabel: string;
};

export function ClinicMapCard({
  googleMapsLabel,
  appleMapsLabel,
}: ClinicMapCardProps) {
  const query = encodeURIComponent(siteConfig.address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${query}&ll=${siteConfig.lat},${siteConfig.lng}`;

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-(--border) bg-(--background-secondary) p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--secondary-accent)/10 text-(--secondary-accent)">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold leading-6 text-foreground/80">
          {siteConfig.address}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-(--secondary-accent) px-4 py-2 text-sm font-bold text-(--secondary-accent-foreground) transition-colors hover:bg-(--secondary-accent-hover)"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {googleMapsLabel}
        </a>
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-(--secondary-accent)/40 px-4 py-2 text-sm font-bold text-(--secondary-accent) transition-colors hover:bg-(--secondary-accent)/10"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          {appleMapsLabel}
        </a>
      </div>
    </div>
  );
}
