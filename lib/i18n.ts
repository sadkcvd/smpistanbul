export type Locale = "tr" | "en";

export const defaultLocale: Locale = "tr";
export const supportedLocales: Locale[] = ["tr", "en"];

export function normalizeLocale(value?: string): Locale {
  return value === "en" ? "en" : "tr";
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(first);
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocalePrefix = segments.length > 0 && (segments[0] === "tr" || segments[0] === "en");
  const rest = hasLocalePrefix ? segments.slice(1) : segments;
  const normalized = `/${rest.join("/")}`.replace(/\/+$/, "") || "/";
  return localizedPath(normalized, targetLocale);
}

