import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { richTags } from "@/lib/rich-text";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Filled in when real testimonials are collected. */
  avatar?: string;
  profileUrl?: string;
};

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1"];
const tones = ["bg-note", "bg-white", "bg-brand-tint", "bg-white", "bg-note"];

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const tAnchors = await getTranslations("anchors");
  const items = t.raw("items") as Testimonial[];

  return (
    <section id={tAnchors("testimonials")} className="py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", richTags)} text={t("subtitle")} />
        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.name}>
              <Reveal delay={index * 0.06} className="h-full">
                <article
                  className={[
                    "tape flex h-full flex-col p-6 pt-8 shadow-[6px_8px_0_0_rgba(28,34,48,0.1)] note-lift",
                    tilts[index] ?? "",
                    tones[index] ?? "bg-white",
                  ].join(" ")}
                >
                  <blockquote className="flex-1 text-base leading-relaxed text-ink">
                    <p>“{item.quote}”</p>
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3 border-t-2 border-dashed border-ink/20 pt-5">
                    {item.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.avatar}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white"
                      >
                        {item.name.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">{item.name}</p>
                      <p className="truncate text-xs text-muted">{item.role}</p>
                    </div>
                    {item.profileUrl ? (
                      <a
                        href={item.profileUrl}
                        target="_blank"
                        rel="noopener"
                        aria-label={t("profileLink", { name: item.name })}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-white"
                      >
                        <LinkedinIcon size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-ink/30 text-ink/40"
                      >
                        <LinkedinIcon size={16} />
                      </span>
                    )}
                  </footer>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-muted">{t("placeholderNotice")}</p>
      </div>
    </section>
  );
}
