import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { Photo } from "./mediaContent";
import { nextPhoto, swipeDirection } from "./photoState";
export function PhotoViewer({
  photos,
  initial,
  locale,
  close,
  returnTo,
}: {
  photos: Photo[];
  initial: number;
  locale: "ru" | "en";
  close: () => void;
  returnTo: HTMLElement | null;
}) {
  const [index, setIndex] = useState(initial);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const ru = locale === "ru";
  const move = (delta: number) => {
    if (photos.length < 2) return;
    setStatus("loading");
    setIndex((i) => nextPhoto(i, delta, photos.length));
  };
  useEffect(() => {
    const el = dialog.current!;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    el.showModal();
    return () => {
      el.close();
      document.body.style.overflow = previous;
      queueMicrotask(() => returnTo?.focus({ preventScroll: true }));
    };
  }, [returnTo]);
  const photo = photos[index];
  return (
    <dialog
      className="photo-viewer"
      ref={dialog}
      aria-label={ru ? "Просмотр фотографий" : "Photo viewer"}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          move(e.key === "ArrowRight" ? 1 : -1);
        }
        if (e.key === "Tab") {
          const buttons = Array.from(
            e.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
          );
          const first = buttons[0],
            last = buttons.at(-1);
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <div className="viewer-top">
        <span aria-live="polite">
          {index + 1} / {photos.length}
        </span>
        <button
          autoFocus
          onClick={close}
          aria-label={ru ? "Закрыть просмотр" : "Close viewer"}
        >
          <X />
        </button>
      </div>
      <div
        className="viewer-image"
        onTouchStart={(e) => {
          if (e.touches.length === 1)
            touch.current = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            };
          else touch.current = null;
        }}
        onTouchEnd={(e) => {
          if (!touch.current) return;
          const end = e.changedTouches[0];
          const direction = swipeDirection(
            end.clientX - touch.current.x,
            end.clientY - touch.current.y,
          );
          touch.current = null;
          if (direction) move(direction);
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
      >
        <img
          key={photo.file}
          src={`/assets/sections/${photo.file}`}
          alt={photo[locale]}
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          style={{ visibility: status === "ready" ? "visible" : "hidden" }}
        />
        {status !== "ready" && (
          <p className="viewer-status" role="status">
            {status === "error"
              ? ru
                ? "Не удалось загрузить фотографию. Выберите соседнюю."
                : "Photo could not be loaded. Try another image."
              : ru
                ? "Загружаем фотографию…"
                : "Loading photo…"}
          </p>
        )}
      </div>
      <div className="viewer-bottom">
        {photos.length > 1 && (
          <button
            onClick={() => move(-1)}
            aria-label={ru ? "Предыдущая фотография" : "Previous photo"}
          >
            <ArrowLeft />
          </button>
        )}
        <p>{photo[locale]}</p>
        {photos.length > 1 && (
          <button
            onClick={() => move(1)}
            aria-label={ru ? "Следующая фотография" : "Next photo"}
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </dialog>
  );
}
