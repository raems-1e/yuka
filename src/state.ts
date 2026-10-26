export type Region = "ru" | "ae";
export type Locale = "ru" | "en" | "ar";
export type Version =
  { region: Region; locale: "ru" | "en" } | { region: "ae"; locale: "ar" };

// One site: Arabic always uses UAE content. Accept old Event bookmarks.
export function parseVersion(search: string): Version {
  const q = new URLSearchParams(search);
  if (q.get("lang") === "ar") return { region: "ae", locale: "ar" };
  const legacyEvent = q.get("site") === "event";
  return {
    region: legacyEvent || q.get("region") === "ae" ? "ae" : "ru",
    locale: legacyEvent || q.get("lang") === "en" ? "en" : "ru",
  };
}
export function versionURL(v: Version) {
  return `?region=${v.region}&lang=${v.locale}`;
}
export function changeRegion(v: Version): Version {
  if (v.locale === "ar") return v;
  return { ...v, region: v.region === "ru" ? "ae" : "ru" };
}
export function changeLocale(v: Version, locale: Locale): Version {
  if (locale === v.locale) return v;
  if (v.locale === "ar" && locale === "ru") return v;
  if (locale === "ar")
    return v.region === "ae" ? { region: "ae", locale: "ar" } : v;
  return { region: locale === "en" ? "ae" : v.region, locale };
}
export function availableLocales(v: Version): Locale[] {
  return v.region === "ru"
    ? ["ru", "en"]
    : v.locale === "ar"
      ? ["en", "ar"]
      : ["ru", "en", "ar"];
}

export type Page = "home" | "gymkhana";
export function parsePage(pathname: string, v: Version): Page {
  return /^\/gymkhana\/?$/.test(pathname) &&
    v.region === "ru" &&
    v.locale === "ru"
    ? "gymkhana"
    : "home";
}
export function pageURL(page: Page, v: Version): string {
  const path =
    page === "gymkhana" && v.region === "ru" && v.locale === "ru"
      ? "/gymkhana"
      : "/";
  return path + versionURL(v);
}
