import type { Region } from "./state";
type Stat = { value: string; ru: string; en: string };
export type Photo = { file: string; ru: string; en: string };
type Content = {
  photos: Photo[];
  socials: string[];
  hasSeasons: boolean;
  about: { ru: string; en: string };
  seasons: Record<string, Stat[] | undefined>;
};
export const mediaContent: Record<Region, Content> = {
  ru: {
    photos: [
      {
        file: "795-9453-4.png",
        ru: "Пилот в красном комбинезоне между автомобилями",
        en: "Driver in a red racing suit between cars",
      },
      {
        file: "795-9453-3.png",
        ru: "Сцена Yuka Drive Fest с вечерней подсветкой",
        en: "Yuka Drive Fest stage illuminated at night",
      },
      {
        file: "795-9453-2.png",
        ru: "Белый автомобиль на ночной трассе",
        en: "White car on the night circuit",
      },
      {
        file: "795-9453-1.png",
        ru: "Гоночный автомобиль на мероприятии Yuka",
        en: "Race car at a Yuka event",
      },
      {
        file: "795-9453-0.png",
        ru: "Фотография российского мероприятия из макета Yuka",
        en: "Russian event photograph from the Yuka design",
      },
    ],
    socials: ["Telegram", "VK", "Rutube", "Дзен"],
    hasSeasons: true,
    about: {
      ru: "Что такое Yuka Drive Gymkhana?",
      en: "What is Yuka Drive Gymkhana?",
    },
    seasons: {
      "2026": [
        { value: "11", ru: "этапов", en: "rounds" },
        { value: "70 000+", ru: "гостей", en: "guests" },
        { value: "230", ru: "пилотов", en: "drivers" },
      ],
    },
  },
  ae: {
    photos: [],
    socials: [],
    hasSeasons: false,
    about: { ru: "Yuka в Эмиратах", en: "Yuka in the UAE" },
    seasons: {},
  },
};
