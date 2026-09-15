import type { CSSProperties, ReactNode } from "react";

type DoodleProps = {
  children: ReactNode;
  /** Seconds to wait once in view, to stagger several doodles. */
  delay?: number;
  className?: string;
};

/**
 * Wraps decorative SVG strokes so they draw themselves when scrolled into view.
 * Purely visual: everything inside is aria-hidden. See InViewObserver.tsx.
 */
export function Doodle({ children, delay = 0, className }: DoodleProps) {
  const style = delay ? ({ "--doodle-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <span
      aria-hidden="true"
      style={style}
      className={["doodle block", className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}
