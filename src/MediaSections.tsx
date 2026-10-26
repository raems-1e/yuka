import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale, Region } from "./state";
import { PhotoViewer } from "./PhotoViewer";
import { mediaContent } from "./mediaContent";

const asset = (name: string) => `/assets/sections/${name}`;
export function MediaSections({
  region,
  locale,
  notify,
  galleryOnly = false,
}: {
  region: Region;
  locale: Locale;
  notify: () => void;
  galleryOnly?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const photoOpener = useRef<HTMLElement | null>(null);
  const content = mediaContent[region];
  const ru = locale === "ru";
  const ar = locale === "ar";
  const [year, setYear] = useState("2026");
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) =>
    rail.current?.scrollBy({
      left: direction * 358,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  const albums = ru ? "Смотреть альбомы на VK" : "View albums on VK";
  const stats = content.seasons[year];
  return (
    <>
      {selected !== null && content.photos.length > 0 && (
        <PhotoViewer
          photos={content.photos}
          initial={selected}
          locale={ru ? "ru" : "en"}
          returnTo={photoOpener.current}
          close={() => setSelected(null)}
        />
      )}
      <section className="gallery-section" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <p>{ar ? "صور الفعاليات" : ru ? "Галерея" : "Gallery"}</p>
            <h2 id="gallery-title">
              {galleryOnly ? "В ОБЪЕКТИВЕ" : ar ? "معرض الصور" : "GALLERY"}
            </h2>
          </div>
          {content.photos.length > 0 && (
            <div className="gallery-controls">
              <button
                onClick={() => move(-1)}
                aria-label={ru ? "Предыдущие фотографии" : "Previous photos"}
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => move(1)}
                aria-label={ru ? "Следующие фотографии" : "Next photos"}
              >
                <ArrowRight />
              </button>
              <button className="albums-link" onClick={notify}>
                {albums}
                <ArrowUpRight size={20} />
              </button>
            </div>
          )}
        </div>
        {content.photos.length ? (
          <div
            className="gallery-rail"
            ref={rail}
            tabIndex={0}
            role="region"
            aria-label={
              ru
                ? "Фотографии Yuka — прокрутка по горизонтали"
                : "Yuka photos — horizontal scrolling"
            }
          >
            <button className="album-card" onClick={notify}>
              <img loading="lazy" decoding="async"
                className="album-grid"
                src={asset("795-9453-6.svg")}
                alt=""
              />
              <img loading="lazy" decoding="async" className="album-vk" src={asset("795-9453-5.svg")} alt="" />
              <span>{albums}</span>
              <ArrowUpRight className="album-arrow" size={20} />
            </button>
            {content.photos.map((photo, i) => (
              <button
                className="gallery-photo"
                key={photo.file}
                onClick={(e) => {
                  photoOpener.current = e.currentTarget;
                  setSelected(i);
                }}
                aria-label={`${ru ? "Открыть фотографию" : "Open photo"} ${i + 1}: ${photo[ru ? "ru" : "en"]}`}
              >
                <img
                  src={asset(photo.file)}
                  alt={photo[ru ? "ru" : "en"]}
                  loading="lazy"
                  width={350}
                  height={372}
                />
                <span className="sr-only">
                  {i + 1} / {content.photos.length}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="content-pending">
            {ar
              ? "ستُضاف صور الفعاليات في الإمارات بعد اعتمادها."
              : ru
                ? "Фотографии мероприятий в ОАЭ будут добавлены после согласования."
                : "UAE event photographs will be added after approval."}
          </p>
        )}
      </section>
      {!galleryOnly && (
        <>
          <section className="social-section" aria-labelledby="social-title">
            <div className="section-heading">
              <div>
                <p>
                  {ar
                    ? "تابع آخر أخبارنا على منصات التواصل الاجتماعي!"
                    : ru
                      ? "Следи за новостями в наших социальных сетях!"
                      : "Follow the news on our social channels!"}
                </p>
                <h2 id="social-title">{ar ? "تابعنا" : "SOCIAL"}</h2>
              </div>
              <div className="social-links">
                {content.socials.map((name) => (
                  <button
                    key={name}
                    aria-label={name}
                    onClick={notify}
                    className={`social-link social-${name.toLowerCase()}`}
                  >
                    {name === "Telegram" && (
                      <img loading="lazy" decoding="async" src={asset("795-9368-6.png")} alt="" />
                    )}
                    {name === "VK" && (
                      <img loading="lazy" decoding="async" src={asset("795-9368-5.png")} alt="" />
                    )}
                    {name === "Rutube" && (
                      <span className="rutube-icon">
                        <img loading="lazy" decoding="async" src={asset("795-9368-3.svg")} alt="" />
                        <img loading="lazy" decoding="async" src={asset("795-9368-4.svg")} alt="" />
                      </span>
                    )}
                    {name === "Дзен" && (
                      <span className="dzen-icon">
                        <img loading="lazy" decoding="async" src={asset("795-9368-0.svg")} alt="" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {!content.socials.length && (
              <p className="content-pending">
                {ar
                  ? "لم تُضف روابط حساباتنا في الإمارات بعد."
                  : ru
                    ? "Социальные сети ОАЭ пока не подключены."
                    : "UAE social channels are not connected yet."}
              </p>
            )}
          </section>
          <section className="season-statistics" aria-labelledby="season-title">
            {content.hasSeasons && (
              <div
                className="year-switch"
                role="group"
                aria-label={ru ? "Год сезона" : "Season year"}
              >
                {["2025", "2026"].map((y) => (
                  <button
                    key={y}
                    aria-pressed={year === y}
                    onClick={() => setYear(y)}
                  >
                    <span className="year-edge" />
                    <span className="year-center">{y}</span>
                    <span className="year-edge right" />
                  </button>
                ))}
              </div>
            )}
            <p>
              {ar
                ? "يوكا في الإمارات"
                : ru
                  ? content.about.ru
                  : content.about.en}
            </p>
            <h2 id="season-title">
              {content.hasSeasons
                ? `${ru ? "СЕЗОН" : "SEASON"} ${year}`
                : ar
                  ? "يوكا جيمخانا تشالنج"
                  : "YUKA GYMKHANA CHALLENGE"}
            </h2>
            {content.hasSeasons && (
              <div aria-live="polite" className="stats-content">
                {stats ? (
                  <>
                    <div className="stat-grid">
                      {stats.map((stat) => (
                        <div
                          key={stat.ru}
                          className="stat"
                          tabIndex={0}
                          aria-label={`${stat.value} ${stat[ru ? "ru" : "en"]}`}
                        >
                          <svg
                            className="stat-shape"
                            viewBox="0 0 259 304.155"
                            width="259"
                            height="304.155"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M258.5 75.1134L129.501 0.577462L0.500002 75.1134L0.501039 229.042L129.501 303.577L258.5 229.042V75.1134Z"
                              stroke="white"
                            />
                          </svg>
                          <strong aria-hidden="true">{stat.value}</strong>
                          <span aria-hidden="true">
                            {stat[ru ? "ru" : "en"]}
                          </span>
                        </div>
                      ))}
                    </div>

                  </>
                ) : (
                  <p className="content-pending">
                    {ru
                      ? "Показатели этого сезона пока не подтверждены."
                      : "Figures for this season have not been confirmed yet."}
                  </p>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
