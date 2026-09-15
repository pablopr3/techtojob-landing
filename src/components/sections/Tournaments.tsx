import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { CheckDoodle, TrophyDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

type Benefit = { title: string; text: string };
type TournamentItem = {
  number: string;
  title: string;
  meta: string;
  status: "done" | "live" | "next";
};

export async function Tournaments() {
  const t = await getTranslations("tournaments");
  const tAnchors = await getTranslations("anchors");
  const benefits = t.raw("benefits") as Benefit[];
  const items = t.raw("items") as TournamentItem[];

  return (
    <section id={tAnchors("tournaments")} className="py-20 lg:py-28">
      <div className="container-x">
        <div className="flex items-start gap-8">
          <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", richTags)} text={t("text")} />
          <Doodle className="ml-auto hidden w-28 shrink-0 text-brand md:block">
            <TrophyDoodle className="w-full" />
          </Doodle>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ol className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {benefits.map((benefit, index) => (
              <li key={benefit.title}>
                <Reveal delay={index * 0.08}>
                  <article className="sketch-soft flex gap-4 bg-white p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-ink">{benefit.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{benefit.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>

          <div className="tape sketch rotate-1 bg-note p-6 sm:p-8">
            <h3 className="text-sm font-bold text-ink">{t("listLabel")}</h3>
            <ol className="mt-5 divide-y-2 divide-dashed divide-ink/20">
              {items.map((item, index) => (
                <li key={item.number} className="flex items-start gap-4 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-brand-deep">
                    {item.status === "done" ? (
                      <Doodle delay={index * 0.2} className="h-7 w-7">
                        <CheckDoodle className="h-full w-full" />
                      </Doodle>
                    ) : item.status === "live" ? (
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-brand/30"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 rounded-full border-2 border-dashed border-muted"
                      />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className={["font-bold text-ink", item.status === "done" ? "line-through decoration-2 decoration-brand" : ""].join(" ")}>
                      <span className="mr-2 text-muted">{item.number}</span>
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.meta}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener"
              variant="ghost"
              className="mt-6 w-full sm:w-auto"
            >
              {t("cta")}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
