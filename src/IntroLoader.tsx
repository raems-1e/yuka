import { useEffect, useState } from "react";
import { introLogo } from "./introArtwork";

export function useIntro() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">(() =>
    matchMedia("(prefers-reduced-motion: reduce)").matches ? "done" : "loading",
  );
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPhase("done");
      return;
    }
    const reveal = setTimeout(() => setPhase("revealing"), 1850);
    const finish = setTimeout(() => setPhase("done"), 2300);
    const stop = () => {
      if (mq.matches) {
        clearTimeout(reveal);
        clearTimeout(finish);
        setPhase("done");
      }
    };
    mq.addEventListener("change", stop);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Independent of CSS events and video readiness: the document always unlocks.
    const unlock = setTimeout(() => {
      document.body.style.overflow = previous;
    }, 2300);
    return () => {
      clearTimeout(reveal);
      clearTimeout(finish);
      clearTimeout(unlock);
      mq.removeEventListener("change", stop);
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);
  return phase;
}
export function IntroLoader({ revealing }: { revealing: boolean }) {
  return (
    <div
      className={`intro-loader ${revealing ? "is-revealing" : ""}`}
      aria-hidden="true"
    >
      <div
        className="intro-logo"
        dangerouslySetInnerHTML={{ __html: introLogo }}
      />
    </div>
  );
}
