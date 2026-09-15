import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { ConnectorDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

type Step = { title: string; text: string };

const tilts = ["-rotate-1", "rotate-1", "-rotate-[0.5deg]", "rotate-[0.75deg]"];

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const tAnchors = await getTranslations("anchors");
  const steps = t.raw("steps") as Step[];

  return (
    <section id={tAnchors("howItWorks")} className="bg-mist/80 py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", richTags)}
          text={t("subtitle")}
        />
        <div className="relative mt-24">
          <Doodle className="pointer-events-none absolute inset-x-8 -top-16 hidden h-16 text-brand lg:block">
            <ConnectorDoodle className="h-full w-full" />
          </Doodle>
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex">
                <Reveal delay={index * 0.08} className="flex w-full">
                  <article
                    className={[
                      "sketch flex w-full flex-col bg-white p-6 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1",
                      tilts[index] ?? "",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                        index % 2 ? "bg-highlight text-ink" : "bg-brand text-white",
                      ].join(" ")}
                    >
                      {index + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
