import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={[
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p
        className={[
          "text-sm font-semibold tracking-wide",
          isDark ? "text-highlight" : "text-brand-deep",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <h2
        className={[
          "mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl",
          isDark ? "text-white [&_.marker]:text-ink" : "text-ink",
        ].join(" ")}
      >
        {title}
      </h2>
      {text ? (
        <p
          className={[
            "mt-4 text-base leading-relaxed sm:text-lg",
            isDark ? "text-white/80" : "text-muted",
          ].join(" ")}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
