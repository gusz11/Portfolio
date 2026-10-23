import type { ReactNode } from "react";

/** A quiet browser frame, shared by the cover and the internal case study. */
export function LuriaWindow({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="luria-window">
      <div className="luria-window-chrome" aria-hidden="true">
        <span className="luria-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
