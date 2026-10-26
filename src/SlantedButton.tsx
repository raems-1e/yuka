import type { ReactNode } from "react";
import { RollingLabel } from "./HeaderControls";
export function SlantedButton({
  children,
  tone = "white",
  onClick,
}: {
  children: ReactNode;
  tone?: "white" | "red";
  onClick: () => void;
}) {
  return (
    <button className={`slanted ${tone}`} onClick={onClick}>
      <img className="edge left" src={`/assets/${tone}-left.svg`} alt="" />
      <span className="slanted-center">
        <RollingLabel>{children}</RollingLabel>
      </span>
      <img className="edge right" src={`/assets/${tone}-right.svg`} alt="" />
    </button>
  );
}
