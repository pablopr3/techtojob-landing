import { getTranslations } from "next-intl/server";
import {
  Code2,
  Server,
  Database,
  ShieldCheck,
  Cloud,
  Sparkles,
  PenTool,
  Smartphone,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Doodle } from "@/components/ui/Doodle";
import { BubblesDoodle, CheckDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

type Area = { name: string; text: string };

const areaIcons = [Code2, Server, Database, ShieldCheck, Cloud, Sparkles, PenTool, Smartphone];
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2", "-rotate-1", "rotate-2"];
const tones = ["bg-note", "bg-white", "bg-brand-tint", "bg-brand-tint", "bg-white", "bg-note", "bg-brand-tint", "bg-brand-tint"];

export async function Networking() {
  const t = await getTranslations("networking");
  const tAnchors = await getTranslations("anchors");
  const areas = t.raw("areas") as Area[];
  const extras = t.raw("extras") as string[];

  return (
    <section id={tAnchors("networking")} className="border-y-2 border-ink/80 bg-mist/80 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", richTags)} text={t("text")} />
            <ul className="mt-8 space-y-4">
              {extras.map((extra, index) => (
                <li key={extra} className="flex items-start gap-3 text-sm text-ink-soft">
                  <Doodle delay={index * 0.2} className="mt-0.5 h-6 w-6 shrink-0 text-ink">
                    <CheckDoodle className="h-full w-full" />
                  </Doodle>
                  {extra}
                </li>
              ))}
            </ul>
            <Doodle delay={0.3} className="mt-10 hidden w-32 text-brand lg:block">
              <BubblesDoodle className="w-full" />
            </Doodle>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink">{t("areasLabel")}</h3>
            <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {areas.map((area, index) => {
                const Icon = areaIcons[index] ?? Code2;
                return (
                  <li key={area.name}>
                    <Reveal delay={Math.min(index * 0.05, 0.25)} className="h-full">
                      <div
                        className={[
                          "tape flex h-full flex-col gap-3 p-4 pt-5 shadow-[4px_6px_0_0_rgba(28,34,48,0.1)] note-lift",
                          tilts[index] ?? "",
                          tones[index] ?? "bg-white",
                        ].join(" ")}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-bold text-ink">{area.name}</p>
                          <p className="mt-0.5 text-xs leading-snug text-muted">{area.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
