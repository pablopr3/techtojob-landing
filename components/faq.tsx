import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AnimatedButtonLabel, fillButtonClasses } from "@/components/animated-button-label";
import { CommunityAvatar } from "@/components/community-avatar";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

export type FaqItem = { q: string; a: string };

/** Preguntas frecuentes presentadas como un canal de Discord: cada pregunta es un mensaje y la respuesta, su hilo. */
export async function FaqSection({ items, id = "faq" }: Readonly<{ items: FaqItem[]; id?: string }>) {
  const t = await getTranslations("faq");

  return (
    <section id={id} className="relative scroll-mt-24 overflow-hidden bg-ink px-[var(--page-gutter)] py-[clamp(5rem,10vw,9rem)]" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto grid max-w-[80rem] gap-14 min-[64rem]:grid-cols-[.8fr_1.2fr] min-[64rem]:gap-16">
        <div className="min-[64rem]:sticky min-[64rem]:top-32 min-[64rem]:self-start">
          <h2 id={`${id}-heading`} className="max-w-[10ch] text-balance font-bold tracking-[-.035em]">{t("title")}</h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-white/72">{t("intro")}</p>

          <aside data-swing-card className="relative mt-12 max-w-[24rem] -rotate-[1.5deg] rounded-2xl bg-postit p-6 text-ink shadow-card">
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
                <details name={id} open={index === 0} className="group rounded-xl bg-discord-embed ring-1 ring-transparent transition-shadow open:ring-primary/45">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:text-primary min-[36rem]:gap-4 min-[36rem]:px-4 [&::-webkit-details-marker]:hidden">
                    <CommunityAvatar name={`faq ${item.q}`} size={40} className="size-10 shrink-0" />
                    <h3 className="flex-1 text-base font-bold leading-snug text-discord-heading transition-colors group-hover:text-primary min-[36rem]:text-lg">{item.q}</h3>
                    <span aria-hidden="true" className="relative size-4 shrink-0 text-primary before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:rounded-full before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:rounded-full after:bg-current after:transition-transform group-open:after:rotate-90" />
                  </summary>
                  <div className="flex gap-3 px-3 pb-5 pt-1 min-[36rem]:gap-4 min-[36rem]:px-4">
                    <span aria-hidden="true" className="ml-5 hidden h-5 w-5 shrink-0 rounded-bl-lg border-b-2 border-l-2 border-white/15 min-[36rem]:block" />
                    <div className="min-w-0 flex-1 rounded-xl border-l-4 border-primary bg-primary/12 p-4">
                      <p className="flex items-center gap-2 text-sm font-bold text-primary">
                        <Image src="/images/brand-mark.svg" alt="" width={18} height={18} className="size-[1.125rem]" />
                        {t("replier")}
                      </p>
                      <p className="mt-2 leading-relaxed text-discord-text">{item.a}</p>
                    </div>
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
