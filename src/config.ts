import { availableLocales } from "./state";
import type { Region, Version } from "./state";
export const futureDomains = {
  ae: { en: "https://yukaracing.ae/", ru: null },
  ru: { ru: null, en: null },
};
export const languageOptions = {
  ru: { value: "ru", label: "Русский", lang: "ru" },
  en: { value: "en", label: "English", lang: "en" },
  ar: { value: "ar", label: "العربية", lang: "ar" },
};
export const labels = {
  ar: {
    gymkhana: "جيمخانا",
    skip: "انتقل إلى المحتوى",
    subtitle: "رياضة السيارات والمهرجانات",
    menu: "القائمة",
    close: "إغلاق",
    pilot: "تسجيل السائقين",
    visitor: "تسجيل الزوار",
    partnership: "الشراكات",
    press: "الاعتماد الإعلامي",
    special: "مشاريع خاصة",
    seasons: "المواسم",
    faq: "الأسئلة الشائعة",
    home: "الرئيسية",
    language: "اللغة",
    region: "المنطقة",
    ru: "روسيا",
    ae: "الإمارات العربية المتحدة",
    toAE: "نحن في الإمارات",
    toRU: "نحن في روسيا",
    notice: "هذا القسم غير متاح بعد في النموذج التجريبي",
    pause: "إيقاف الفيديو مؤقتًا",
    play: "تشغيل الفيديو",
  },
  ru: {
    gymkhana: "Gymkhana",
    skip: "К содержимому",
    subtitle: "АВТОСПОРТ & ФЕСТИВАЛЬ",
    menu: "Меню",
    close: "Закрыть",
    pilot: "Регистрация пилотов",
    visitor: "Регистрация посетителей",
    partnership: "Партнёрство",
    press: "Аккредитация СМИ",
    special: "Спецпроекты",
    seasons: "Сезоны",
    faq: "FAQ",
    home: "Главная",
    language: "Язык",
    region: "Регион",
    ru: "Россия",
    ae: "ОАЭ",
    toAE: "Мы в Эмиратах",
    toRU: "Мы в России",
    notice: "Этот раздел пока не подключён",
    pause: "Остановить видео",
    play: "Воспроизвести видео",
  },
  en: {
    gymkhana: "Gymkhana",
    skip: "Skip to content",
    subtitle: "MOTORSPORT & FESTIVAL",
    menu: "Menu",
    close: "Close",
    pilot: "Driver registration",
    visitor: "Visitor registration",
    partnership: "Partnership",
    press: "Media accreditation",
    special: "Special projects",
    seasons: "Seasons",
    faq: "FAQ",
    home: "Home",
    language: "Language",
    region: "Region",
    ru: "Russia",
    ae: "UAE",
    toAE: "We’re in the UAE",
    toRU: "We’re in Russia",
    notice: "This section is not connected yet",
    pause: "Pause video",
    play: "Play video",
  },
};
export type MenuKey =
  "home" | "seasons" | "partnership" | "press" | "special" | "faq";
type RegionalConfig = {
  title: string[];
  series: boolean;
  menu: MenuKey[];
  media: {
    poster: string;
    video: string | null;
    position: string;
    temporary: boolean;
  };
  registrations: { pilot: string | null; visitor: string | null };
};
export const regions: Record<Region, RegionalConfig> = {
  ru: {
    title: ["YUKA DRIVE", "GYMKHANA"],
    series: true,
    menu: ["home", "seasons", "partnership", "press", "special", "faq"],
    media: {
      poster: "/assets/poster-1.png",
      video: "https://kinescope.io/grLisNDFxEj5w6A6CPw72w",
      position: "50% 50%",
      temporary: false,
    },
    registrations: { pilot: null, visitor: null },
  },
  ae: {
    title: ["YUKA GYMKHANA", "CHALLENGE"],
    series: false,
    menu: ["home", "partnership", "press", "faq"],
    media: {
      poster: "/assets/poster-1.png",
      video: "https://kinescope.io/grLisNDFxEj5w6A6CPw72w",
      position: "50% 50%",
      temporary: true,
    },
    registrations: { pilot: null, visitor: null },
  },
};
export function getConfig(version: Version) {
  const { region, locale } = version;
  return {
    ...regions[region],
    text: labels[locale],
    showRegion: locale !== "ar",
    languages: availableLocales(version).map((l) => languageOptions[l]),
    direction: locale === "ar" ? ("rtl" as const) : ("ltr" as const),
    title: locale === "ar" ? ["يوكا جيمخانا", "تشالنج"] : regions[region].title,
    regionLabel: region === "ru" ? labels[locale].toAE : labels[locale].toRU,
  };
}
