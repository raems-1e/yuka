import { useEffect, useRef, useState } from "react";
import { load } from "@kinescope/player-iframe-api-loader";
import type { Kinescope } from "@kinescope/player-iframe-api-loader/types";

export function BackgroundVideo({
  url,
  paused,
  onReady,
  interactive = false,
}: {
  url: string;
  paused: boolean;
  onReady: (ready: boolean) => void;
  interactive?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<Kinescope.IframePlayer.Player | null>(null);
  const [visible, setVisible] = useState(false);
  const desiredPause = useRef(paused);
  desiredPause.current = paused;
  useEffect(() => {
    const p = player.current;
    if (p)
      void (paused ? p.pause() : p.play()).catch(() => {
        setVisible(false);
        onReady(false);
      });
  }, [paused, onReady]);
  useEffect(() => {
    let cancelled = false;
    let instance: Kinescope.IframePlayer.Player | undefined;
    const container = host.current!;
    const iframe = document.createElement("iframe");
    iframe.id = `yuka-video-${crypto.randomUUID()}`;
    iframe.title = "Yuka background video";
    iframe.tabIndex = interactive ? 0 : -1;
    if (!interactive) iframe.setAttribute("aria-hidden", "true");
    iframe.allow = "autoplay; encrypted-media";
    container.append(iframe);
    const fail = () => {
      if (!cancelled) {
        setVisible(false);
        onReady(false);
      }
    };
    setVisible(false);
    onReady(false);
    load()
      .then(async (factory) => {
        if (cancelled) return;
        instance = await factory.create(iframe.id, {
          url,
          size: { width: "100%", height: "100%" },
          behavior: {
            autoPlay: true,
            muted: !interactive,
            loop: true,
            playsInline: true,
            keyboard: interactive,
            localStorage: false,
            preload: "auto",
          },
          ui: { controls: interactive, mainPlayButton: interactive },
        });
        if (cancelled) {
          await instance.destroy();
          return;
        }
        player.current = instance;
        instance.on(instance.Events.Loaded, () => {
          if (!cancelled) {
            onReady(true);
            if (interactive) setVisible(true);
          }
        });
        instance.on(instance.Events.Playing, () => {
          if (!cancelled) {
            setVisible(true);
            onReady(true);
            if (desiredPause.current) void instance?.pause();
          }
        });
        instance.on(instance.Events.Error, fail);
      })
      .catch(fail);
    return () => {
      cancelled = true;
      player.current = null;
      onReady(false);
      if (instance) void instance.destroy().catch(() => {});
      else iframe.remove();
    };
  }, [url, onReady, interactive]);
  return (
    <>
      <div
        ref={host}
        className={`background-video ${visible || interactive ? "is-playing" : ""}`}
        aria-hidden={interactive ? undefined : true}
      />
    </>
  );
}
