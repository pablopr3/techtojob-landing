import type { SVGProps } from "react";

/*
  Hand-drawn strokes used as decoration around the page.
  All paths carry pathLength="1" so the draw-on animation in globals.css
  works with a single dasharray value. Drawn for this project.
*/

type Props = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Wobbly underline for a key phrase. */
export function UnderlineDoodle(props: Props) {
  return (
    <svg viewBox="0 0 300 24" preserveAspectRatio="none" {...props}>
      <path
        {...stroke}
        strokeWidth="5"
        pathLength="1"
        d="M4 14 C 60 6, 120 20, 180 10 S 260 8, 296 14"
      />
      <path
        {...stroke}
        strokeWidth="4"
        pathLength="1"
        d="M20 20 C 90 14, 160 22, 240 16"
      />
    </svg>
  );
}

/** Curved arrow, drawn left to right and slightly down. */
export function ArrowDoodle(props: Props) {
  return (
    <svg viewBox="0 0 160 90" {...props}>
      <path
        {...stroke}
        strokeWidth="4"
        pathLength="1"
        d="M6 12 C 40 4, 100 10, 138 58"
      />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M118 54 L 140 62 L 146 40" />
    </svg>
  );
}

/** Loose circle to ring something. */
export function CircleDoodle(props: Props) {
  return (
    <svg viewBox="0 0 200 80" preserveAspectRatio="none" {...props}>
      <path
        {...stroke}
        strokeWidth="4"
        pathLength="1"
        d="M100 8 C 40 6, 6 22, 8 42 C 10 64, 60 76, 110 74 C 160 72, 196 58, 194 38 C 192 18, 150 6, 92 10 C 70 12, 50 16, 36 24"
      />
    </svg>
  );
}

/** Quick asterisk / sparkle. */
export function SparkDoodle(props: Props) {
  return (
    <svg viewBox="0 0 40 40" {...props}>
      <path {...stroke} strokeWidth="4" pathLength="1" d="M20 4 L 20 36" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M4 20 L 36 20" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M8 8 L 32 32" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M32 8 L 8 32" />
    </svg>
  );
}

/** Hand-drawn tick. */
export function CheckDoodle(props: Props) {
  return (
    <svg viewBox="0 0 40 40" {...props}>
      <path {...stroke} strokeWidth="4.5" pathLength="1" d="M6 22 C 12 26, 16 30, 18 34 C 22 24, 28 14, 36 6" />
    </svg>
  );
}

/** Dashed connector that snakes between the four "how it works" steps (desktop). */
export function ConnectorDoodle(props: Props) {
  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" {...props}>
      <path
        {...stroke}
        strokeWidth="3"
        strokeDasharray="0.012 0.012"
        pathLength="1"
        d="M40 60 C 150 10, 200 110, 300 60 S 450 10, 540 60 S 700 110, 790 60 S 900 20, 960 60"
      />
    </svg>
  );
}

/** Envelope for the newsletter strip. */
export function EnvelopeDoodle(props: Props) {
  return (
    <svg viewBox="0 0 120 90" {...props}>
      <path {...stroke} strokeWidth="4" pathLength="1" d="M10 14 C 40 12, 80 12, 110 14 L 112 76 C 80 78, 40 78, 8 76 Z" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M10 16 L 60 52 L 110 16" />
      <path {...stroke} strokeWidth="3" pathLength="1" d="M10 74 L 46 44 M 110 74 L 74 44" />
    </svg>
  );
}

/** Small trophy for tournaments. */
export function TrophyDoodle(props: Props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <path {...stroke} strokeWidth="4" pathLength="1" d="M34 14 C 50 12, 70 12, 86 14 C 88 40, 82 66, 60 70 C 38 66, 32 40, 34 14 Z" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M34 24 C 20 26, 14 40, 26 50 C 30 54, 36 54, 40 52" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M86 24 C 100 26, 106 40, 94 50 C 90 54, 84 54, 80 52" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M60 70 L 60 88 M 40 100 C 52 96, 68 96, 80 100 M 46 90 C 56 88, 64 88, 74 90 L 76 100 L 44 100 Z" />
    </svg>
  );
}

/** Chat bubbles for networking. */
export function BubblesDoodle(props: Props) {
  return (
    <svg viewBox="0 0 140 110" {...props}>
      <path {...stroke} strokeWidth="4" pathLength="1" d="M12 14 C 40 8, 70 10, 90 14 C 94 30, 92 48, 88 58 C 70 60, 50 60, 34 58 L 16 72 L 18 56 C 10 46, 8 28, 12 14 Z" />
      <path {...stroke} strokeWidth="4" pathLength="1" d="M60 70 C 80 66, 110 66, 128 70 C 132 80, 130 92, 126 100 L 108 98 L 118 106 C 100 108, 78 106, 64 100 C 60 92, 58 80, 60 70 Z" />
      <path {...stroke} strokeWidth="3" pathLength="1" d="M30 30 L 70 30 M 30 42 L 60 42" />
    </svg>
  );
}
