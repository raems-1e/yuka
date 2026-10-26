type Locale = "ru" | "en";
import "./calendar.css";
const asset = (name: string) => `/assets/calendar/${name}`;
function Picture({
  name,
  mobile,
  alt = "",
  className = "",
}: {
  name: string;
  mobile: string;
  alt?: string;
  className?: string;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 640px)" srcSet={asset(mobile)} />
      <img src={asset(name)} alt={alt} />
    </picture>
  );
}
const descriptions = {
  ru: {
    PRO: "Серия для более подготовленных пилотов: высокая конкуренция, сложные трассы, есть командный зачет, строгий регламент с техническими ограничениями, таких, как моношина.",
    LITE: "Более открытый формат соревнований, требования к автомобилю и шинам заметно мягче, а главная цель — дать участникам возможность попробовать себя в дисциплине и получить соревновательный опыт.",
  },
  en: {
    PRO: "A series for experienced drivers: strong competition, challenging courses, team standings and strict technical regulations, including a control tyre.",
    LITE: "A more accessible competition format with more relaxed car and tyre requirements, giving drivers the chance to try gymkhana and gain competition experience.",
  },
};
function Ticket({
  rank,
  completed = false,
  tba = false,
  locale,
  notify,
}: {
  rank: number;
  completed?: boolean;
  tba?: boolean;
  locale: Locale;
  notify: () => void;
}) {
  const ru = locale === "ru";
  return (
    <article
      className={`yc-ticket ${tba ? "yc-ticket--tba" : ""}`}
      aria-label={`${ru ? "Этап" : "Round"} ${rank}: ${tba ? "TBA" : ru ? "Россия" : "Russia"}`}
    >
      <span className="yc-coordinates">
        59.938676,
        <br />
        30.314494
      </span>
      <h3 className="yc-identity">
        <span className="yc-rank">{rank}</span>
        <span className="yc-country">
          {tba ? "TBA" : ru ? "РОССИЯ" : "RUSSIA"}
        </span>
      </h3>
      {completed && (
        <span className="yc-tag">{ru ? "ПРОЙДЕН" : "COMPLETED"}</span>
      )}
      <button className="yc-result" onClick={notify}>
        <img className="yc-eye-normal" src={asset("eye.svg")} alt="" />
        <img className="yc-eye-hover" src={asset("eye-hover.svg")} alt="" />
        <span>{ru ? "Результаты" : "Results"}</span>
      </button>
      <div className="yc-map" aria-hidden="true">
        <div className="yc-map-desktop">
          {["h", "v"].map((axis) => (
            <img
              key={`hover${axis}`}
              className="yc-grid yc-grid-hover"
              src={asset(`map-hover-grid-${axis}.svg`)}
              alt=""
            />
          ))}
          {["h", "v"].map((axis) => (
            <img
              key={axis}
              className="yc-grid yc-grid-normal"
              src={asset(`map-grid-${axis}.svg`)}
              alt=""
            />
          ))}
          <img
            className="yc-path yc-path-normal"
            src={asset("map-path.svg")}
            alt=""
          />
          <img
            className="yc-path yc-path-hover"
            src={asset("map-hover-path.svg")}
            alt=""
          />
        </div>
        <div className="yc-map-mobile">
          <img src={asset("map-mobile.svg")} alt="" />
        </div>
      </div>
      <div className="yc-details">
        {!tba && (
          <span className="yc-date">{ru ? "15–16 мая" : "15–16 May"}</span>
        )}
        <span className="yc-city">
          {ru ? "Нижний Новгород" : "Nizhny Novgorod"}
        </span>
      </div>
      <span className="yc-year">’26</span>
      <span className="yc-perforation" aria-hidden="true" />
      <span className="yc-cut yc-cut-a" aria-hidden="true" />
      <span className="yc-cut yc-cut-b" aria-hidden="true" />
    </article>
  );
}
export function Calendar({
  series,
  setSeries,
  locale,
  notify,
}: {
  series: string;
  setSeries: (s: string) => void;
  locale: Locale;
  notify: () => void;
}) {
  const mode = series === "LITE" ? "lite" : "pro";
  const ru = locale === "ru";
  return (
    <section
      id="calendar"
      className="yuka-calendar"
      data-mode={mode}
      aria-label={ru ? "Календарь Yuka Gymkhana" : "Yuka Gymkhana calendar"}
    >
      <div
        className="yc-tabs"
        role="tablist"
        aria-label={ru ? "Серия соревнований" : "Competition series"}
      >
        {(["pro", "lite"] as const).map((m, index) => (
          <button
            key={m}
            className="yc-tab"
            id={`yc-tab-${m}`}
            role="tab"
            aria-controls={`yc-panel-${m}`}
            aria-selected={mode === m}
            tabIndex={mode === m ? 0 : -1}
            aria-label={`Yuka Gymkhana ${m === "pro" ? "Pro" : "Lite"}`}
            onClick={() => setSeries(m.toUpperCase())}
            onKeyDown={(e) => {
              let next: number | undefined;
              if (e.key === "ArrowRight" || e.key === "ArrowLeft")
                next = 1 - index;
              if (e.key === "Home") next = 0;
              if (e.key === "End") next = 1;
              if (next === undefined) return;
              e.preventDefault();
              const value = next === 0 ? "pro" : "lite";
              setSeries(value.toUpperCase());
              document.getElementById(`yc-tab-${value}`)?.focus();
            }}
          >
            <span className="yc-tab-text">YUKA GYMKHANA {m.toUpperCase()}</span>
            <span className="yc-tab-logo" aria-hidden="true">
              <img
                className="yc-tab-inactive-logo"
                src={asset(`tab-${m}.svg`)}
                alt=""
              />
              <img
                className="yc-tab-active-logo"
                src={asset(`tab-${m}-active.svg`)}
                alt=""
              />
            </span>
          </button>
        ))}
      </div>
      {(["pro", "lite"] as const).map((m) => (
        <div
          key={m}
          className="yc-panel"
          id={`yc-panel-${m}`}
          role="tabpanel"
          aria-labelledby={`yc-tab-${m}`}
          tabIndex={0}
          hidden={mode !== m}
        >
          <div className="yc-intro">
            <div className="yc-logo">
              <Picture
                name={m === "pro" ? "pro-logo.svg" : "lite-logo.png"}
                mobile={
                  m === "pro" ? "pro-logo-mobile.svg" : "lite-logo-mobile.png"
                }
                alt={`Yuka Drive Gymkhana ${m === "pro" ? "Pro" : "Lite Fortis Series"}`}
              />
            </div>
            <p>{descriptions[locale][m === "pro" ? "PRO" : "LITE"]}</p>
            <h2>{ru ? "Календарь" : "Calendar"}</h2>
          </div>
          <div className="yc-events">
            {m === "pro" ? (
              <div className="yc-list">
                {[1, 2, 3, 1].map((rank, i) => (
                  <Ticket
                    key={i}
                    rank={rank}
                    completed={rank === 1}
                    tba={rank === 3}
                    locale={locale}
                    notify={notify}
                  />
                ))}
              </div>
            ) : (
              ["URAL", "VOLGA"].map((group) => (
                <section
                  className="yc-group"
                  key={group}
                  aria-labelledby={`yc-${group}`}
                >
                  <h3 id={`yc-${group}`} className="yc-group-title">
                    LITE {group}
                  </h3>
                  <div className="yc-list">
                    {[1, 2, 3].map((rank) => (
                      <Ticket
                        key={rank}
                        rank={rank}
                        completed={rank === 1}
                        tba={rank === 3}
                        locale={locale}
                        notify={notify}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
