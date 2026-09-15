import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait once in view, to stagger siblings. */
  delay?: number;
  className?: string;
};

/**
 * Fades content in the first time it scrolls into view.
 * Progressive enhancement only: see the in-view rules in globals.css and InViewObserver.tsx.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <div className={["reveal", className].filter(Boolean).join(" ")} style={style}>
      {children}
    </div>
  );
}
