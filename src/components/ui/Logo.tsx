import Image from "next/image";
import logo from "../../../public/logo.svg";

type LogoProps = {
  className?: string;
  /** True in the header so the logo is never lazy-loaded above the fold. */
  priority?: boolean;
};

/** Official TechToJob logo (winner of Tournament #1), outlined SVG in /public/logo.svg. */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="TechToJob"
      width={203}
      height={30}
      priority={priority}
      className={["h-[30px] w-auto", className].filter(Boolean).join(" ")}
    />
  );
}
