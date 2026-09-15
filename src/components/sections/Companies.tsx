import { getTranslations } from "next-intl/server";
import { ArrowRight, Megaphone, Users, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { ArrowDoodle, SparkDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

type Point = { title: string; text: string };

const pointIcons = [Megaphone, Users, MessageSquare];
const tilts = ["rotate-1", "-rotate-1", "rotate-[0.5deg]"];

export async function Companies() {
  const t = await getTranslations("companies");
  const tAnchors = await getTranslations("anchors");
  const points = t.raw("points") as Point[];

  return (
    <section
      id={tAnchors("companies")}
      className="relative overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      {/* Blackboard: same grid, chalk-white and faint. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="relative">
            <Doodle className="absolute -left-8 -top-10 hidden w-10 text-highlight lg:block">
              <SparkDoodle />
            </Doodle>
            <SectionHeading
              tone="dark"
              eyebrow={t("eyebrow")}
              title={t.rich("title", richTags)}
              text={t("text")}
            />
            <div className="mt-10 flex flex-col items-start gap-4">
              <ButtonLink
                href={siteConfig.discordUrl}
                target="_blank"
                rel="noopener"
                variant="secondary"
                size="lg"
              >
                {t("cta")}
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
              <p className="text-sm text-white/70">
                {t("contactPrefix")}{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold text-white underline decoration-highlight decoration-2 underline-offset-4 hover:text-highlight"
                >
                  {t("contactLink")}
                </a>
              </p>
            </div>
            <Doodle delay={0.5} className="mt-8 hidden w-28 text-highlight lg:block">
              <ArrowDoodle className="w-full" />
            </Doodle>
          </div>

          <ul className="grid gap-5 self-center">
            {points.map((point, index) => {
              const Icon = pointIcons[index] ?? Users;
              return (
                <li key={point.title}>
                  <Reveal delay={index * 0.08}>
                    <article
                      className={[
                        "sketch flex gap-5 border-white/60 bg-white/5 p-6 transition-transform duration-300 hover:rotate-0",
                        tilts[index] ?? "",
                      ].join(" ")}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-bold">{point.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{point.text}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
