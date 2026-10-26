import { StrictMode, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { changeLocale, changeRegion, parseVersion } from "./state";
import type { Locale, Version } from "./state";
import { getConfig } from "./config";
import "./style.css";
import { RollingLabel, DesktopLanguage, CompactSeries } from "./HeaderControls";
import { Calendar } from "./Calendar";
import { BackgroundVideo } from "./BackgroundVideo";
import { MediaSections } from "./MediaSections";
import { Menu, ArrowUpRight, X } from "lucide-react";
import "./refinement.css";
import "./navigation-revision.css";
import "./approval.css";
import { ContentSections, sectionWords } from "./ContentSections";
import "./content-stage.css";
import { FinalSections } from "./FinalSections";
import { useHeadingReveal } from "./useHeadingReveal";
import "./final-stage.css";
import { IntroLoader, useIntro } from "./IntroLoader";
import { introGrid } from "./introArtwork";
import "./intro.css";
import { SlantedButton } from "./SlantedButton";
import { GymkhanaPage } from "./GymkhanaPage";
import { parsePage, pageURL } from "./state";
import type { Page } from "./state";
import "./gymkhana.css";
type Config = ReturnType<typeof getConfig>;
function Hero({
  c,
  paused,
  onReady,
}: {
  c: Config;
  paused: boolean;
  onReady: (ready: boolean) => void;
}) {
  const [posterLoaded, setPosterLoaded] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      if (!hero.current || !grid.current) return;
      const bounds = hero.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / bounds.height));
      grid.current.style.transform = `translate3d(${mq.matches ? 0 : progress * 120}px,0,0)`;
    };
    const tick = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    addEventListener("scroll", tick, { passive: true });
    addEventListener("resize", tick);
    mq.addEventListener("change", tick);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", tick);
      removeEventListener("resize", tick);
      mq.removeEventListener("change", tick);
    };
  }, []);
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(mq.matches);
    mq.addEventListener("change", change);
    return () => mq.removeEventListener("change", change);
  }, []);
  return (
    <>
      <section
        ref={hero}
        className="hero"
        style={{ "--poster-position": c.media.position } as CSSProperties}
        aria-labelledby="hero-title"
      >
        <img
          className={`poster ${posterLoaded ? "is-loaded" : ""}`}
          src={c.media.poster}
          alt=""
          onLoad={() => setPosterLoaded(true)}
        />
        {c.media.video && !reduced && (
          <BackgroundVideo
            url={c.media.video}
            paused={paused}
            onReady={onReady}
          />
        )}
        <div className="shade" />
        <div
          ref={grid}
          className="grid"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: introGrid }}
        />
        <div className="hero-copy" key={c.title.join("")}>
          <p>{c.text.subtitle}</p>
          <h1 id="hero-title" dir={c.direction}>
            {c.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>
      </section>
    </>
  );
}
type Shared = {
  c: Config;
  v: Version;
  onRegion: () => void;
  onLocale: (l: Locale) => void;
  notify: () => void;
  series: string;
  setSeries: (s: string) => void;
  menuOpen: boolean;
  home: (anchor?: string) => void;
  gymkhana: () => void;
};
function DesktopHeader(
  p: Shared & {
    open: (e: MouseEvent<HTMLButtonElement>) => void;
    revealed: boolean;
  },
) {
  const { c, v, onLocale, notify } = p;
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !p.revealed) return;
    const elements = header.current!.querySelectorAll(
      ".brand,.nav-main > button,.nav-main > .series > button,.desktop-language,.desktop-actions > button",
    );
    const animations = Array.from(elements).map((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: "translateX(-12px)" },
          { opacity: 1, transform: "translateX(0)" },
        ],
        {
          duration: 360,
          delay: i * 35,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        },
      ),
    );
    const stop = () => {
      if (mq.matches) animations.forEach((a) => a.cancel());
    };
    mq.addEventListener("change", stop);
    return () => {
      animations.forEach((a) => a.cancel());
      mq.removeEventListener("change", stop);
    };
  }, []);
  return (
    <header className={`desktop-header ${p.revealed ? "header-ready" : "header-loading"}`} ref={header}>
      <button
        className="brand"
        aria-label={c.text.home}
        onClick={() => p.home()}
      >
        <img src="/assets/logo.svg" alt="YUKA" />
      </button>
      <nav aria-label={c.text.menu} className="desktop-nav">
        <img className="nav-edge" src="/assets/nav-edge.svg" alt="" />
        <img
          className="nav-edge nav-edge-right"
          src="/assets/nav-edge.svg"
          alt=""
        />
        <div className="nav-main">
          <button
            className="wide-link"
            onClick={(e) => {
              if (p.v.region === "ru" && p.v.locale === "ru") p.gymkhana();
              else if (c.series)
                document.getElementById("calendar")?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                });
              else p.open(e);
            }}
          >
            <RollingLabel>{c.text.gymkhana}</RollingLabel>
          </button>
          {c.menu
            .filter((k) => k === "special")
            .map((k) => (
              <button
                className="wide-link"
                key={k}
                onClick={() => p.home("projects")}
              >
                <RollingLabel>{c.text[k]}</RollingLabel>
              </button>
            ))}
          {c.series && (
            <CompactSeries
              series={p.series}
              onChange={p.setSeries}
              label={v.locale === "ru" ? "Серия" : "Series"}
            />
          )}
          <DesktopLanguage
            options={c.languages}
            label={c.text.language}
            locale={v.locale}
            onChange={onLocale}
          />
          <button
            className="desktop-menu"
            onClick={p.open}
            aria-haspopup="dialog"
            aria-controls="navigation-menu"
            aria-expanded={p.menuOpen}
          >
            <Menu size={16} aria-hidden="true" />
            <RollingLabel>{c.text.menu}</RollingLabel>
          </button>
          <div className="desktop-actions">
            {c.showRegion && (
              <SlantedButton onClick={p.onRegion}>
                {c.regionLabel}
              </SlantedButton>
            )}
            <SlantedButton tone="red" onClick={notify}>
              {c.text.visitor}
            </SlantedButton>
          </div>
        </div>
      </nav>
    </header>
  );
}
function MobileNavigation(
  p: Shared & { open: (e: MouseEvent<HTMLButtonElement>) => void },
) {
  return (
    <nav className="mobile-navigation" aria-label={p.c.text.menu}>
      <div className="mobile-row">
        <button
          onClick={() => {
            if (p.v.region === "ru" && p.v.locale === "ru") p.gymkhana();
            else
              document
                .getElementById(p.c.series ? "calendar" : "hero-title")
                ?.scrollIntoView({ behavior: "instant" });
          }}
        >
          {p.c.text.gymkhana}
        </button>
        {p.c.series && (
          <button onClick={() => p.home("projects")}>{p.c.text.special}</button>
        )}
        <button
          className="menu-trigger"
          onClick={p.open}
          aria-haspopup="dialog"
          aria-controls="navigation-menu"
          aria-expanded={p.menuOpen}
        >
          <Menu size={18} aria-hidden="true" />
          {p.c.text.menu}
        </button>
      </div>
    </nav>
  );
}
function NavigationMenu(
  p: Shared & { close: () => void; returnTo: HTMLElement | null },
) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const close = (after?: () => void) => {
    if (closing) return;
    const finish = () => {
      p.close();
      after?.();
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else {
      setClosing(true);
      closeTimer.current = setTimeout(finish, 220);
    }
  };
  useEffect(() => {
    const previous = p.returnTo;
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      node?.close();
      document.body.style.overflow = overflow;
      queueMicrotask(() => previous?.focus({ preventScroll: true }));
    };
  }, []);
  const action = (fn: () => void) => {
    close(fn);
  };
  return (
    <dialog
      ref={dialog}
      id="navigation-menu"
      className={closing ? "is-closing" : ""}
      aria-label={p.c.text.menu}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const buttons = Array.from(
          e.currentTarget.querySelectorAll<HTMLButtonElement>(
            "button:not(:disabled)",
          ),
        ).filter((b) => b.getClientRects().length);
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="menu-sheet">
        <div className="menu-meta">
          <img
            className="open-menu-logo"
            src="/assets/logo.svg"
            alt="Yuka ADV Pro Racing"
          />
          <span>
            {p.c.text[p.v.region]} /{" "}
            <bdi>
              {p.v.locale === "ar" ? "العربية" : p.v.locale.toUpperCase()}
            </bdi>
          </span>
          <button
            className="menu-close"
            autoFocus
            onClick={() => close()}
            aria-label={p.c.text.close}
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav className="menu-columns" aria-label={p.c.text.menu}>
          {[
            p.c.menu.filter((k) => ["home", "seasons"].includes(k)),
            p.c.menu.filter((k) => ["partnership", "press", "faq"].includes(k)),
            [
              "organizer",
              "news",
              "partners",
              ...(p.c.series ? ["special"] : []),
            ],
          ]
            .filter((group) => group.length)
            .map((group, i) => (
              <div className="menu-column" key={i}>
                {group.map((k) => (
                  <button
                    key={k}
                    onClick={() =>
                      action(() => {
                        const target = (
                          {
                            home: "hero-title",
                            seasons: "calendar",
                            special: "projects",
                            organizer: "organizer",
                            news: "news",
                            partners: "partners",
                            partnership: "cooperation",
                            press: "cooperation",
                          } as Record<string, string>
                        )[k];
                        if (k === "home") p.home();
                        else if (target) {
                          const el = document.getElementById(target);
                          if (el) el.scrollIntoView({ behavior: "instant" });
                          else p.home(target);
                        } else p.notify();
                      })
                    }
                  >
                    <RollingLabel>
                      {k in sectionWords[p.v.locale]
                        ? sectionWords[p.v.locale][
                            k as "organizer" | "news" | "partners"
                          ]
                        : p.c.text[k as keyof typeof p.c.text]}
                    </RollingLabel>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            ))}
          <div className="menu-column menu-registration">
            <button onClick={() => action(p.notify)}>
              <RollingLabel>{p.c.text.pilot}</RollingLabel>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
        <div className="menu-bottom-row">
        <div className="menu-settings">
          <div>
            <span>{p.c.text.language}</span>
            <DesktopLanguage
              options={p.c.languages}
              locale={p.v.locale}
              label={p.c.text.language}
              onChange={(l) => action(() => p.onLocale(l))}
            />
          </div>
          {p.c.series && (
            <div>
              <span>{p.v.locale === "ru" ? "Серия" : "Series"}</span>
              <CompactSeries
                series={p.series}
                label={p.v.locale === "ru" ? "Серия" : "Series"}
                onChange={(s) => action(() => p.setSeries(s))}
              />
            </div>
          )}
        </div>
        <div className="menu-actions">
          {p.c.showRegion && (
            <SlantedButton onClick={() => action(p.onRegion)}>
              {p.c.regionLabel}
            </SlantedButton>
          )}
          <SlantedButton tone="red" onClick={() => action(p.notify)}>
            {p.c.text.visitor}
          </SlantedButton>
        </div>
        </div>
      </div>
    </dialog>
  );
}
function App() {
  const intro = useIntro();
  const revealed = intro !== "loading";
  const [v, setV] = useState(() => parseVersion(location.search));
  const [page, setPage] = useState<Page>(() =>
    parsePage(location.pathname, parseVersion(location.search)),
  );
  const [scrollTarget, setScrollTarget] = useState<{ anchor?: string } | null>(
    null,
  );
  useEffect(() => {
    if (!scrollTarget) return;
    const id = requestAnimationFrame(() => {
      if (scrollTarget.anchor)
        document
          .getElementById(scrollTarget.anchor)
          ?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(id);
  }, [scrollTarget, page]);
  const [menu, setMenu] = useState(false);
  const videoPaused = false;
  const [, setVideoReady] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
    opener.current = e.currentTarget;
    setMenu(true);
  };
  const [series, setSeries] = useState("PRO");
  const [notice, setNotice] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const c = getConfig(v);
  useHeadingReveal(`${page}-${v.region}-${v.locale}`, revealed);
  useEffect(() => {
    const initialVersion = parseVersion(location.search);
    history.replaceState(
      null,
      "",
      pageURL(parsePage(location.pathname, initialVersion), initialVersion),
    );
    const pop = () => {
      const next = parseVersion(location.search);
      setV(next);
      setPage(parsePage(location.pathname, next));
      setMenu(false);
      setNotice("");
    };
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  useEffect(() => {
    document.documentElement.lang = v.locale;
    document.documentElement.dir = v.locale === "ar" ? "rtl" : "ltr";
    delete document.documentElement.dataset.site;
    document.title =
      page === "gymkhana"
        ? "Что такое джимхана — YUKA DRIVE GYMKHANA"
        : c.title.join(" ");
  }, [v, c.title, page]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const update = (next: Version) => {
    if (next.region !== v.region || next.locale !== v.locale) {
      history.pushState(null, "", pageURL("home", next));
      setPage("home");
      setScrollTarget({});
      setV(next);
    }
    setMenu(false);
    setNotice("");
  };
  const notify = () => {
    clearTimeout(timer.current);
    setNotice(c.text.notice);
    timer.current = setTimeout(() => setNotice(""), 5000);
  };
  const navigate = (nextPage: Page, anchor?: string) => {
    if (page !== nextPage) history.pushState(null, "", pageURL(nextPage, v));
    setPage(nextPage);
    setMenu(false);
    setNotice("");
    setScrollTarget({ anchor });
  };
  const props = {
    home: (anchor?: string) => navigate("home", anchor),
    gymkhana: () => navigate("gymkhana"),
    c,
    v,
    onRegion: () => update(changeRegion(v)),
    onLocale: (l: Locale) => update(changeLocale(v, l)),
    notify,
    series,
    setSeries: (value: string) => {
      setSeries(value);
      if (page === "gymkhana") {
        navigate("home", "calendar");
        return;
      }
      document.getElementById("calendar")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    },
    menuOpen: menu,
  };
  return (
    <>
      {intro !== "done" && <IntroLoader revealing={revealed} />}
      <div
        className={`site-content ${revealed ? "intro-revealed" : "intro-pending"}`}
        inert={intro !== "done"}
      >
        <a className="skip" href="#main">
          {c.text.skip}
        </a>
        <DesktopHeader {...props} open={openMenu} revealed={revealed} />
        <div
          className={`mobile-brand ${revealed ? "header-ready" : "header-loading"}`}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget)
              e.currentTarget.style.animation = "none";
          }}
        >
          <button
            className="mobile-home-link"
            aria-label={c.text.home}
            onClick={() => navigate("home")}
          >
            <img src="/assets/logo.svg" alt="YUKA" />
          </button>
        </div>
        <main id="main">
          {page === "gymkhana" ? (
            <GymkhanaPage notify={notify} revealed={revealed} onOpenMenu={openMenu} />
          ) : (
            <>
              <Hero c={c} paused={videoPaused} onReady={setVideoReady} />
              {c.series && (
                <Calendar
                  series={series}
                  setSeries={setSeries}
                  locale={v.locale === "ru" ? "ru" : "en"}
                  notify={notify}
                />
              )}
              <MediaSections
                key={v.region}
                region={v.region}
                locale={v.locale}
                notify={notify}
              />
              <ContentSections
                region={v.region}
                locale={v.locale}
                notify={notify}
              />
            </>
          )}
        </main>
        <FinalSections
          region={v.region}
          locale={v.locale}
          notify={notify}
          footerOnly={page === "gymkhana"}
        />
        <MobileNavigation {...props} open={openMenu} />
        {menu && (
          <NavigationMenu
            {...props}
            returnTo={opener.current}
            close={() => setMenu(false)}
          />
        )}
        <div
          className={`toast ${notice ? "visible" : ""}`}
          role="status"
          aria-live="polite"
        >
          {notice}
        </div>
      </div>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
