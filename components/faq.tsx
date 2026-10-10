import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimatedButtonLabel, fillButtonClasses } from "@/components/animated-button-label";
import { CommunityAvatar } from "@/components/community-avatar";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

export type FaqItem = {
  q: string;
  /** Respuesta corta: se ve siempre, sin abrir la pregunta. */
  short: string;
  /** Respuesta completa: aparece al abrir. */
  a: string;
  steps?: string[];
  chips?: string[];
};

/** Preguntas frecuentes como canal de Discord: cada fila enseña la respuesta corta y se abre para ver el detalle. */
export async function FaqSection({ items, id = "faq" }: Readonly<{ items: FaqItem[]; id?: string }>) {
  const t = await getTranslations("faq");

  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden bg-ink px-[var(--page-gutter)] py-[clamp(5rem,10vw,9rem)] text-white" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto grid max-w-[80rem] gap-12 min-[64rem]:grid-cols-[.8fr_1.2fr] min-[64rem]:gap-16">
        <div className="min-[64rem]:sticky min-[64rem]:top-32 min-[64rem]:self-start">
          <h2 id={`${id}-heading`} className="max-w-[10ch] text-balance font-bold tracking-[-.035em]">{t("title")}</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/72">{t("intro")}</p>

          <aside data-swing-card className="relative mt-12 hidden max-w-[24rem] -rotate-[1.5deg] rounded-2xl bg-postit p-6 text-ink shadow-card min-[64rem]:block">
            <Image src="/images/pin.svg" alt="" width={32} height={36} data-swing-pin className="absolute -top-5 left-8 h-9 w-auto" />
            <p className="text-xl font-bold leading-tight tracking-[-.02em]">{t("noteTitle")}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{t("note")}</p>
            <a href={site.discord} className={`${fillButtonClasses} mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white before:bg-primary hover:text-ink`}>
              <Image src="/images/discord-light.svg" alt="" width={24} height={18.29} className="relative z-10 h-5 w-auto" />
              <AnimatedButtonLabel text={t("noteButton")} variant="fill" />
            </a>
          </aside>
        </div>

        <div className="discord-window relative rounded-2xl bg-discord-chat p-3 text-discord-text shadow-card min-[36rem]:p-5">
          <div className="flex items-center justify-between gap-4 px-2 pb-4 pt-2 min-[36rem]:px-3">
            <p className="text-xs font-bold text-primary">{t("channel")}</p>
            <p className="rounded-full bg-white/8 px-3 py-1 text-xs font-bold text-discord-muted">{t("pinned")} · {items.length}</p>
          </div>
          <ul className="grid gap-2">
            {items.map((item, index) => (
              <li key={item.q}>
                <details name={id} open={index === 0} className="group rounded-xl bg-discord-embed open:bg-primary open:text-ink">
                  <summary className="flex cursor-pointer list-none items-start gap-3 rounded-xl px-3 py-4 min-[36rem]:gap-4 min-[36rem]:px-5 min-[36rem]:py-5 [&::-webkit-details-marker]:hidden">
                    <CommunityAvatar name={`faq ${item.q}`} size={44} className="mt-0.5 size-11 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold leading-snug text-discord-muted group-open:text-ink">{item.q}</h3>
                      <p className="mt-1.5 text-balance text-xl font-bold leading-tight tracking-[-.02em] text-white group-open:text-ink min-[36rem]:text-2xl">{item.short}</p>
                    </div>
                    <span aria-hidden="true" className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-primary transition-colors group-hover:bg-white/14 group-open:bg-ink group-open:text-white motion-reduce:transition-none">
                      <span className="relative size-3.5 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:rounded-full before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:rounded-full after:bg-current group-open:after:rotate-90" />
                    </span>
                  </summary>
                  <div className="px-3 pb-6 min-[36rem]:pl-[5.25rem] min-[36rem]:pr-16">
                    <p className="max-w-[60ch] border-t border-ink/20 pt-4 leading-relaxed text-ink">{item.a}</p>
                    {(item.steps ?? item.chips) && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {(item.steps ?? item.chips ?? []).map((entry, n) => (
                          <li key={entry} className="flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-sm font-bold text-white">
                            {item.steps && <span aria-hidden="true" className="-ml-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs text-ink">{n + 1}</span>}
                            {entry}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </section>
  );
}
