import { useEffect } from "react";
// Progressive enhancement: headings stay readable if motion or observers are unavailable.
export function useHeadingReveal(versionKey: string, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) return;
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, #cooperation h2, #cooperation h3",
      ),
    );
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.removeAttribute("data-reveal-pending");
          if (!mq.matches)
            animations.push(
              el.animate(
                [
                  { opacity: 0, transform: "translateY(22px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 550, easing: "cubic-bezier(.2,.7,.2,1)" },
              ),
            );
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    for (const el of headings.filter((el) => !el.closest(".g-hero"))) {
      el.setAttribute("data-reveal-pending", "");
      observer.observe(el);
    }
    const stop = () => {
      if (!mq.matches) return;
      observer.disconnect();
      headings.forEach((el) => el.removeAttribute("data-reveal-pending"));
      animations.forEach((a) => a.cancel());
    };
    mq.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      headings.forEach((el) => el.removeAttribute("data-reveal-pending"));
      animations.forEach((a) => a.cancel());
      mq.removeEventListener("change", stop);
    };
  }, [versionKey, enabled]);
}
