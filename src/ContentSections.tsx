import type { Locale, Region } from "./state";
import { RollingLabel } from "./HeaderControls";
import { ArrowUpRight } from "lucide-react";
import { newsImages } from "./contentAssets";
export const sectionWords = {
  ru: {
    organizer: "Организатор",
    news: "Новости",
    partners: "Партнёры",
    projects: "Все спецпроекты",
    allNews: "Все новости",
    pendingNews:
      "Новости мероприятий в ОАЭ появятся после подтверждения материалов.",
    pendingPartners: "Состав партнёров ОАЭ уточняется.",
    draft: "Предварительный текст для согласования.",
  },
  en: {
    organizer: "Organizer",
    news: "News",
    partners: "Partners",
    projects: "All special projects",
    allNews: "All news",
    pendingNews:
      "UAE event news will appear once the materials have been confirmed.",
    pendingPartners: "The UAE partner list is being confirmed.",
    draft: "Draft copy for approval.",
  },
  ar: {
    organizer: "المنظّم",
    news: "الأخبار",
    partners: "الشركاء",
    projects: "جميع المشاريع",
    allNews: "جميع الأخبار",
    pendingNews: "ستُضاف أخبار الفعاليات في الإمارات بعد اعتماد المواد.",
    pendingPartners: "سيُعلن عن شركاء الإمارات بعد اعتماد القائمة.",
    draft: "نص أولي للمراجعة والاعتماد.",
  },
};
const organizerCopy = {
  ru: {
    ru: [
      "Yuka ADV Pro Racing — автоспортивный бренд, который с 2020 года занимается поддержкой российского автоспорта и является организатором и соорганизатором крупнейших соревновательных серий.",
      "Через собственную федеральную серию соревнований Yuka Drive Fest развивает в России джимхану — зрелищную дисциплину автоспорта, объединяющую дрифт, автокросс и слалом и привлекающую новых пилотов и зрителей.",
    ],
    en: [
      "Yuka ADV Pro Racing is a motorsport brand that has supported Russian motorsport since 2020, organizing and co-organizing major competition series.",
      "Through its nationwide Yuka Drive Fest series, the brand develops gymkhana in Russia — a spectator-friendly motorsport discipline combining drifting, autocross and slalom, bringing new drivers and spectators into the sport.",
    ],
    ar: [],
  },
  ae: {
    ru: [
      "Yuka ADV Pro Racing — организатор Yuka Gymkhana Challenge. Проект направлен на развитие и продвижение джимханы в ОАЭ и знакомство пилотов и зрителей с этой дисциплиной автоспорта.",
    ],
    en: [
      "Yuka ADV Pro Racing organizes Yuka Gymkhana Challenge. The project aims to develop and promote gymkhana in the UAE and introduce drivers and spectators to this motorsport discipline.",
    ],
    ar: [
      "تنظّم Yuka ADV Pro Racing فعالية Yuka Gymkhana Challenge. يهدف المشروع إلى تطوير رياضة الجيمخانا والتعريف بها في دولة الإمارات، وإتاحة الفرصة للسائقين والجمهور للتعرّف إلى هذه الرياضة.",
    ],
  },
};
const newsTitles = {
  ru: [
    "Беларусь стала эпицентром финала YUKA DRIVE FEST Джимхана 2025!",
    "Впервые в Москве! Как прошёл 4-й этап YUKA DRIVE FEST Джимхана",
    "Отгремел GRAND FINAL сезона 2025 Drift That… YUKA",
    "Четвёртый этап Чемпионата Поволжья по дрифту Drift That… YUKA прошёл в центре Ульяновска",
  ],
  en: [
    "Belarus hosted the YUKA DRIVE FEST Gymkhana 2025 final!",
    "For the first time in Moscow: round 4 of YUKA DRIVE FEST Gymkhana",
    "The 2025 Drift That… YUKA GRAND FINAL",
    "Round four of the Volga drifting championship Drift That… YUKA took place in central Ulyanovsk",
  ],
};
export const partnerLogos: [string, string, number, number][] = [
  ["imgXcom", "Xcom", 130, 24],
  ["imgN3Com3", "N3COM", 81, 23],
  ["imgIcore", "ICORE", 101, 17],
  ["img", "ОКА", 79, 33],
  ["img1", "АДВ Консалтинг", 68, 37],
  ["nwb", "NWB", 73, 13],
  ["imgDriftThat", "Drift That", 100, 23],
  ["imgAltair", "Altair", 35, 33],
  ["imgFortis", "Fortis", 73, 16],
  ["imgKgm", "KGM", 86, 20],
  ["img2", "Шинсервис", 109, 24],
  ["imgGroup2087329587", "Race Monitor", 76, 25],
  ["imgGroup2087329588", "ДЭЛГУ-МСК", 92, 34],
  ["imgDepartament", "Департамент", 127, 42],
  ["imgSport", "Спорт", 101, 27],
  ["vk", "VK Видео", 111, 24],
  ["img3", "Чемпионат", 114, 23],
  ["yka", "Yuka", 62, 33],
  ["combined", "Партнёр из российского макета", 143, 18],
  ["imgGroup5", "Партнёр из российского макета", 76, 19],
  ["imgGroup2087329583", "Партнёр из российского макета", 83, 32],
  ["imgGroup2087329584", "Qtickets", 96, 20],
  ["imgDryRu", "DRYDRY", 100, 24],
];
const asset = (name: string) => `/assets/content/${name}.svg`;
export function PartnerLogo({
  name,
  label,
  width,
  height,
}: {
  name: string;
  label: string;
  width: number;
  height: number;
}) {
  if (name === "yka")
    return (
      <span className="compound-logo yka-logo" role="img" aria-label={label}>
        <img src={asset("partner-imgGroup2")} alt="" />
        <img src={asset("partner-imgGroup4")} alt="" />
      </span>
    );
  if (name === "combined")
    return (
      <span
        className="compound-logo combined-partner"
        role="img"
        aria-label={label}
      >
        <img src={asset("partner-imgGroup7")} alt="" />
        <img src={asset("partner-imgGroup6")} alt="" />
      </span>
    );
  if (name === "nwb")
    return (
      <span className="compound-logo nwb" role="img" aria-label={label}>
        {["imgVector", "imgVector1", "imgVector2", "imgGroup1"].map((p, i) => (
          <img
            key={p}
            src={asset(`partner-${p}`)}
            alt=""
            style={{
              left: [0, 21.24, 30.12, 52.01][i],
              width: [20.11, 14.28, 20.74, 20.92][i],
            }}
          />
        ))}
      </span>
    );
  if (name === "vk")
    return (
      <span className="compound-logo vk-logo" role="img" aria-label={label}>
        <img src={asset("partner-imgBg")} alt="" />
        <img src={asset("partner-imgIntersect")} alt="" />
        <img src={asset("partner-imgTypeZone")} alt="" />
      </span>
    );
  return (
    <img
      src={asset(`partner-${name}`)}
      alt={label}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}
export function PartnerMarquee({ locale }: { locale: Locale }) {
  return (
    <div
      className="partner-marquee"
      tabIndex={0}
      role="region"
      aria-label={
        locale === "ru" ? "Партнёры" : locale === "ar" ? "الشركاء" : "Partners"
      }
    >
      {[2, 3].map((rows) => (
        <div className={`partner-layout partner-layout-${rows}`} key={rows}>
          {Array.from({ length: rows }, (_, row) => {
            const logos = partnerLogos.filter((_, i) => i % rows === row);
            return (
              <div className="partner-lane" key={row}>
                <div
                  className="partner-track"
                  style={{ animationDuration: `${55 + row * 8}s` }}
                >
                  {[0, 1].map((copy) => (
                    <div
                      className="partner-group"
                      key={copy}
                      aria-hidden={copy === 1 ? true : undefined}
                    >
                      {logos.map(([name, label, width, height]) => (
                        <div className="partner-cell" key={name}>
                          <PartnerLogo
                            name={name}
                            label={label}
                            width={width}
                            height={height}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
export function ContentSections({
  region,
  locale,
  notify,
}: {
  region: Region;
  locale: Locale;
  notify: () => void;
}) {
  const w = sectionWords[locale];
  return (
    <>
      <section
        className="organizer-section"
        id="organizer"
        aria-labelledby="organizer-title"
      >
        <div className="organizer-card">
          <div className="organizer-brand">
            <h2 id="organizer-title">{w.organizer}</h2>
            <img
              src="/assets/logo.svg"
              alt="Yuka ADV Pro Racing"
              width="179"
              height="44"
              loading="lazy"
            />
          </div>
          <div className="organizer-copy">
            {organizerCopy[region][locale].map((p) => (
              <p key={p}>{p}</p>
            ))}
            {region === "ae" && <small>{w.draft}</small>}
          </div>
          {region === "ru" && (
            <div className="organizer-projects" id="projects">
              <div
                className="project-rail"
                tabIndex={0}
                role="region"
                aria-label={w.projects}
              >
                {[
                  "RCC",
                  "Drift That",
                  "Yuka Drive NLS",
                  "Российская серия кольцевых гонок",
                ].map((name, i) => (
                  <button
                    className="project-tile"
                    key={name}
                    onClick={notify}
                    aria-label={name}
                  >
                    {i === 2 ? (
                      <span
                        className="compound-logo nls"
                        role="img"
                        aria-label={name}
                      >
                        {["img", "imgGroup", "imgVector", "imgGroup1"].map(
                          (p, j) => (
                            <img
                              key={p}
                              alt=""
                              src={asset(`org-${p}`)}
                              style={{
                                left: [0.26, 0, 101.48, 107.15][j],
                                top: [0.71, 0.44, 0, 1.24][j],
                                width: [99.374, 99.374, 42.373, 31.045][j],
                                height: [10.2, 10.196, 11.08, 8.599][j],
                              }}
                            />
                          ),
                        )}
                      </span>
                    ) : (
                      <img
                        alt=""
                        src={asset(
                          `org-${["imgLayer1", "imgDriftThat", "", "imgLayer1Copy5"][i]}`,
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
              <button className="slanted red projects-action" onClick={notify}>
                <img className="edge left" src="/assets/red-left.svg" alt="" />
                <span className="slanted-center">
                  <RollingLabel>{w.projects}</RollingLabel>
                </span>
                <img
                  className="edge right"
                  src="/assets/red-right.svg"
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      </section>
      <section id="news" className="news-section" aria-labelledby="news-title">
        <div className="section-heading">
          <div>
            <p>{w.news}</p>
            <h2 id="news-title">{locale === "ar" ? w.news : "NEWS"}</h2>
          </div>
          {region === "ru" && (
            <button className="content-text-link" onClick={notify}>
              {w.allNews}
              <ArrowUpRight size={20} />
            </button>
          )}
        </div>
        {region === "ru" ? (
          <div className="news-rail">
            {newsImages.map((file, i) => (
              <button className="news-card" key={file} onClick={notify}>
                <span className="news-image">
                  <img
                    src={file}
                    alt=""
                    loading="lazy"
                    style={{
                      objectPosition: [
                        "62% center",
                        "54% center",
                        "44% center",
                        "12% center",
                      ][i],
                    }}
                  />
                </span>
                <span>{newsTitles[locale === "ru" ? "ru" : "en"][i]}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="content-pending">{w.pendingNews}</p>
        )}
      </section>
      <section
        id="partners"
        className="partners-section"
        aria-labelledby="partners-title"
      >
        <div className="section-heading">
          <div>
            <p>{w.partners}</p>
            <h2 id="partners-title">
              {locale === "ar" ? w.partners : "PARTNERS"}
            </h2>
          </div>
        </div>
        {region === "ru" ? (
          <PartnerMarquee locale={locale} />
        ) : (
          <p className="content-pending">{w.pendingPartners}</p>
        )}
      </section>
    </>
  );
}
