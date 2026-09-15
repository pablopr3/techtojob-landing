import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { richTags } from "@/lib/rich-text";
import { Reveal } from "@/components/ui/Reveal";

type NewsItem = {
  category: string;
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  slug: string;
};

export async function News() {
  const t = await getTranslations("news");
  const tAnchors = await getTranslations("anchors");
  const items = t.raw("items") as NewsItem[];

  return (
    <section id={tAnchors("news")} className="border-t-2 border-ink/80 bg-board py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t("eyebrow")} title={t.rich("title", richTags)} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.slug}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="sketch-soft flex h-full flex-col gap-4 bg-white p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className="marker text-ink">
                      {item.category}
                    </span>
                    <time dateTime={item.date} className="text-muted">
                      {item.dateLabel}
                    </time>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold leading-snug text-ink">
                      {/* Posts live on Discord until the blog exists. */}
                      <a
                        href={siteConfig.discordUrl}
                        target="_blank"
                        rel="noopener"
                        className="hover:underline hover:decoration-brand hover:decoration-2 hover:underline-offset-4"
                      >
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {item.summary}
                    </p>
                  </div>
                  <a
                    href={siteConfig.discordUrl}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${t("readMore")}: ${item.title}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
                  >
                    {t("readMore")}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
