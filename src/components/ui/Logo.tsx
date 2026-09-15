import Image from "next/image";

type LogoProps = {
  className?: string;
  /** True in the header so the logo is never lazy-loaded above the fold. */
  priority?: boolean;
};

/** Official TechToJob logo (winner of Tournament #1), outlined SVG in /public/logo.svg. */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="TechToJob"
      width={203}
      height={30}
      priority={priority}
      unoptimized
      className={["h-[30px] w-auto", className].filter(Boolean).join(" ")}
    />
  );
}
