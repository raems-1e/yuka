import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "./state";
import { ChevronDown } from "lucide-react";

export function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="rolling-label">
      <span className="rolling-track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

export function CompactSelect({
  value,
  onChange,
  label,
  options,
  kind = "language",
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string; lang?: string }[];
  kind?: "language" | "series";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    root.current
      ?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      ?.focus();
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      className={`desktop-language compact-select select-${kind} ${value === "ar" ? "event-language" : ""}`}
      ref={root}
      onBlur={(e) => {
        // Safari can blur a button with relatedTarget=null before a touch click.
        // Keep the panel mounted until the click; pointerdown handles outside taps.
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          e.stopPropagation();
          close();
        }
        if (open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
          e.preventDefault();
          const options = Array.from(
            root.current!.querySelectorAll<HTMLButtonElement>(
              ".language-option",
            ),
          );
          const i = options.indexOf(
            document.activeElement as HTMLButtonElement,
          );
          options[
            (i + (e.key === "ArrowDown" ? 1 : -1) + options.length) %
              options.length
          ]?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="language-trigger"
        aria-label={`${label}: ${value === "ar" ? "العربية" : value.toUpperCase()}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <RollingLabel>
          {value === "ar" ? "العربية" : value.toUpperCase()}
        </RollingLabel>
        <ChevronDown
          className="language-chevron"
          size={14}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          id={id}
          className="language-popover"
          role="group"
          aria-label={label}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="language-option"
              lang={option.lang}
              aria-pressed={option.value === value}
              onClick={() => {
                onChange(option.value);
                close();
              }}
            >
              <span>{option.label}</span>
              <span>{option.value.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DesktopLanguage({
  locale,
  onChange,
  label,
  options,
}: {
  options: { value: string; label: string; lang: string }[];
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}) {
  return (
    <CompactSelect
      value={locale}
      onChange={(value) => onChange(value as Locale)}
      label={label}
      options={options}
    />
  );
}
export function CompactSeries({
  series,
  onChange,
  label,
}: {
  series: string;
  onChange: (series: string) => void;
  label: string;
}) {
  return (
    <CompactSelect
      value={series}
      onChange={onChange}
      label={label}
      kind="series"
      options={[
        { value: "PRO", label: "Gymkhana" },
        { value: "LITE", label: "Gymkhana" },
      ]}
    />
  );
}
