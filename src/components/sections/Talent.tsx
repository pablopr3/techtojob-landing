import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { CheckDoodle, SparkDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

type Point = { title: string; text: string };

export async function Talent() {
  const t = await getTranslations("talent");
  const tAnchors = await getTranslations("anchors");
  const points = t.raw("points") as Point[];
  const stack = t.raw("card.stack") as string[];

  return (
    <section id={tAnchors("talent")} className="py-20 lg:py-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", richTags)} text={t("text")} />
          <ul className="mt-10 space-y-6">
            {points.map((point, index) => (
              <li key={point.title} className="flex gap-4">
                <Doodle delay={index * 0.25} className="mt-0.5 h-8 w-8 shrink-0 text-ink">
                  <CheckDoodle className="h-full w-full" />
                </Doodle>
                <div>
                  <h3 className="font-bold text-ink">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noopener"
            variant="ghost"
            className="mt-10"
          >
            {t("cta")}
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>

        <Reveal>
          <figure className="relative mx-auto w-full max-w-md pt-4">
            <Doodle className="absolute -right-4 -top-2 w-9 text-brand lg:-right-8">
              <SparkDoodle />
            </Doodle>
            <div className="tape sketch -rotate-[1.5deg] bg-white p-6 shadow-[8px_10px_0_0_var(--color-note)] sm:p-7">
              <figcaption className="text-xs font-semibold text-muted">{t("card.label")}</figcaption>
              <div className="mt-4 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-bold text-white"
                >
                  {t("card.name").charAt(0)}
                </span>
                <div>
                  <p className="font-bold text-ink">{t("card.name")}</p>
                  <p className="text-sm text-muted">{t("card.role")}</p>
                </div>
                <span className="ml-auto rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  {t("card.level")}
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                {stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border-2 border-ink/70 px-3 py-1 text-xs font-semibold text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid gap-4 border-t-2 border-dashed border-line pt-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold text-muted">{t("card.availabilityLabel")}</dt>
                  <dd className="mt-1 font-semibold text-ink">{t("card.availability")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted">{t("card.lookingLabel")}</dt>
                  <dd className="mt-1 font-semibold text-ink">{t("card.looking")}</dd>
                </div>
              </dl>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
