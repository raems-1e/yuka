import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Expand } from "lucide-react";

import { PhotoViewer } from "./PhotoViewer";
import { partnerLogos, PartnerLogo } from "./ContentSections";
const photos = ["008", "063", "068", "070", "075"].map((n,i)=>({file:`gym-2026-${n}.webp`,ru:["Заезд на трассе", "Зрители фестиваля", "Болельщики у трассы", "Пилоты перед стартом", "Автомобили после заезда"][i],en:"Yuka Gymkhana 2026"}));
const heroFiles = ["DSC06432", "Yuka-91", "DSC06604", "Yuka-183", "Yuka-221", "Yuka-2333333", "ivanov-056", "BRM04865", "BRM05332"];
export function HeroPhotos({enabled}:{enabled:boolean}) {
  const [index,setIndex]=useState(0);
  const host=useRef<HTMLDivElement>(null);
  const [requested,setRequested]=useState<Set<number>>(()=>new Set([0]));
  useEffect(()=>{
    if (!enabled || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRequested(previous=>new Set([...previous,(index+1)%heroFiles.length]));
  },[enabled,index]);
  useEffect(()=>{
    if(!enabled)return;
    const mq=matchMedia("(prefers-reduced-motion: reduce)");
    let raf=0,last=0,elapsed=0,current=0;
    const tick=(now:number)=>{
      if(last && !document.hidden && !mq.matches){elapsed+=Math.min(now-last,80);if(elapsed>=4500){{
        const next=(current+1)%heroFiles.length;
        const image=host.current?.querySelector<HTMLImageElement>(`[data-frame="${next}"]`);
        if(image?.complete && image.naturalWidth){
          elapsed%=4500;
          current=next;
          setIndex(next);
        }
      }}}
      last=now;
      host.current?.closest<HTMLElement>('.g-hero')?.style.setProperty('--hero-progress',mq.matches?'0':String(Math.min(elapsed/4500,1)));
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf);
  },[enabled]);
  return <div ref={host} className={`g-hero-slider g-hero-autoplay ${enabled?'is-running':''}`} aria-hidden="true">{heroFiles.map((file,i)=><img key={file} data-frame={i} src={requested.has(i)?`/assets/gymkhana/hero/${file}.webp`:undefined} srcSet={requested.has(i)?`/assets/gymkhana/hero/${file}-mobile.webp 900w, /assets/gymkhana/hero/${file}.webp 1920w`:undefined} sizes="100vw" decoding="async" alt="" className={i===index?"is-active":""} fetchPriority={i===0?"high":"low"} draggable={false}/>)}</div>;
}
export function PhotoGrid() {
  const [viewer, setViewer] = useState<{
    index: number;
    opener: HTMLElement;
  } | null>(null);
  return (
    <section className="g-section g-photo-section" id="g-gallery">
      <div className="g-gallery-heading">
        <p className="g-kicker">Не объяснить — почувствовать</p>
        <h2>В КАДРЕ — ДРАЙВ</h2>
      </div>
      <div className="g-photo-grid">
        {photos.map((p, i) => (
          <button
            key={p.file}
            onClick={(e) => setViewer({ index: i, opener: e.currentTarget })}
            aria-label={`Открыть фото: ${p.ru}`}
          >
            <img src={`/assets/sections/${p.file}`} alt={p.ru} loading="lazy" />
            <span>
              <span>YUKA / 0{i + 1}</span>
              <Expand size={20} />
            </span>
          </button>
        ))}
      </div>
      {viewer && (
        <PhotoViewer
          photos={photos}
          initial={viewer.index}
          locale="ru"
          close={() => setViewer(null)}
          returnTo={viewer.opener}
        />
      )}
    </section>
  );
}
const logos = partnerLogos.filter(
  ([name]) => !["imgFortis", "combined", "imgGroup5", "imgGroup2087329583"].includes(name),
);
export function LogoRing() {
  const ring = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const focused = useRef(false);
  const drag = useRef<number | null>(null);
  const draw = () => {
    if (ring.current)
      ring.current.style.transform = `rotateY(${angle.current}deg)`;
  };
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0,
      last = 0;
    const tick = (now: number) => {
      if (
        last &&
        !mq.matches &&
        !document.hidden &&
        !focused.current &&
        drag.current === null
      ) {
        angle.current -= Math.min(now - last, 50) * 0.004;
        draw();
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section className="g-section g-logo-section" id="partners">
      <p className="g-kicker">Рядом с Yuka</p>
      <h2>ДВИЖЕМСЯ ВМЕСТЕ</h2>
      <div
        className="g-logo-stage g-logo-orbit"
        role="region"
        tabIndex={0}
        aria-label="Партнёры. Перетаскивайте влево или вправо, либо используйте клавиши со стрелками. При фокусе вращение приостановлено."
        onFocus={() => {
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            angle.current += e.key === "ArrowRight" ? -18 : 18;
            draw();
          }
        }}
        onPointerDown={(e) => {
          drag.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (drag.current !== null) {
            angle.current += (e.clientX - drag.current) * 0.22;
            drag.current = e.clientX;
            draw();
          }
        }}
        onPointerUp={() => {
          drag.current = null;
          focused.current = false;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div className="g-logo-ring" ref={ring}>
          {logos.map(([file, label, w, h], i) => (
            <div
              className="g-logo-face"
              key={file}
              style={{
                transform: `rotateY(${(i * 360) / logos.length}deg) translateZ(var(--ring-radius))`,
              }}
            >
              <PartnerLogo name={file} label={label} width={w} height={h} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function useGymMotion(enabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) return;
    const animations: Animation[] = [];
    const elements = [
      ...ref.current.querySelectorAll<HTMLElement>(
        ".g-photo-grid > button, .g-festival-grid > div, .g-score-grid > div, .g-pilot-grid > a, .g-steps b > span, .g-title-mask > span, .g-hex",
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "";
          const hex = el.classList.contains("g-hex");
          const video = el.classList.contains("g-video-frame");
          const digit = el.parentElement?.classList.contains("g-digit-mask");
          const title = el.parentElement?.classList.contains("g-title-mask");
          animations.push(
            el.animate(
              [
                {
                  opacity: 0,
                  transform: hex
                    ? "rotate(-120deg) scale(.5)"
                    : digit
                      ? "translateY(0)"
                      : title
                        ? "translateY(110%)"
                        : video
                          ? "translateY(55px) scale(.72)"
                          : "translateY(32px) scale(.97)",
                },
                {
                  opacity: 1,
                  transform: hex
                    ? "rotate(0deg) scale(1)"
                    : digit
                      ? "translateY(0)"
                      : "translateY(0) scale(1)",
                },
              ],
              {
                duration: video ? 1000 : 600,
                delay: Math.min(elements.indexOf(el) % 3, 2) * 70,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "backwards",
              },
            ),
          );
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });
    const stop = () => {
      observer.disconnect();
      elements.forEach((el) => (el.style.opacity = ""));
      animations.forEach((a) => a.cancel());
    };
    const change = () => {
      if (mq.matches) stop();
    };
    mq.addEventListener("change", change);
    return () => {
      stop();
      mq.removeEventListener("change", change);
    };
  }, [enabled]);
  useEffect(()=>{
    const root=ref.current;
    if(!root || !enabled)return;
    const mq=matchMedia('(prefers-reduced-motion: reduce)');
    const hero=root.querySelector<HTMLElement>('.g-hero-slider');
    const photoBreak=root.querySelector<HTMLElement>('.g-photo-break img');
    const video=root.querySelector<HTMLElement>('.g-video-frame');
    let raf=0;
    const update=()=>{raf=0;const top=root.getBoundingClientRect().top;
      if(hero){const shift=mq.matches?0:Math.max(0,Math.min(-top,innerHeight))*.32;hero.style.transform=`translateY(${shift}px)`;hero.style.setProperty('--hero-shift',`${shift}px`);}
      if(photoBreak){const box=photoBreak.parentElement!.getBoundingClientRect();photoBreak.style.transform=mq.matches?'':`translateY(${Math.max(-70,Math.min(70,(innerHeight/2-box.top-box.height/2)*.12))}px) scale(1.15)`;}
      if(video){const rect=video.getBoundingClientRect();const progress=Math.min(1,Math.max(0,(innerHeight-rect.top)/(innerHeight*.75)));video.style.scale=mq.matches?'':String(.82+.18*progress);}
    };
    const queue=()=>{if(!raf)raf=requestAnimationFrame(update);};
    update();addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);mq.addEventListener('change',queue);
    return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',queue);removeEventListener('resize',queue);mq.removeEventListener('change',queue);if(hero)hero.style.transform='';if(video)video.style.scale='';};
  },[enabled]);
  return ref;
}

export function HorizontalRail({label,className,children}:{label:string;className:string;children:ReactNode}) {
 const start=useRef<{x:number;scroll:number}|null>(null);
 return <div className={`g-horizontal-rail ${className}`} role="region" aria-label={label} tabIndex={0}
 onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();e.currentTarget.scrollBy({left:(e.key==='ArrowRight'?1:-1)*e.currentTarget.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}}
 onPointerDown={e=>{if(e.pointerType!=='mouse'||(e.target as HTMLElement).closest('a,button'))return;start.current={x:e.clientX,scroll:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}}
 onPointerMove={e=>{if(start.current)e.currentTarget.scrollLeft=start.current.scroll-(e.clientX-start.current.x);}}
 onPointerUp={()=>{start.current=null;}} onPointerCancel={()=>{start.current=null;}}>{children}</div>;
}
