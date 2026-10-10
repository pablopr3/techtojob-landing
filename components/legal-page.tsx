import Image from "next/image";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { PageHero, PageShell } from "@/components/page-shell";
import { owner } from "@/lib/site";

export type LegalSection = { title: string; content: ReactNode };

export const legalLink = "font-bold underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:bg-primary/25";

/** Datos identificativos del titular, compartidos por las dos páginas legales. */
export function OwnerDetails() {
  const rows: [string, ReactNode][] = [
    ["Titular", owner.name],
    ...(owner.taxId ? [["NIF", owner.taxId] as [string, ReactNode]] : []),
    ["Domicilio", owner.address],
    ["Correo electrónico", <a key="email" className={legalLink} href={`mailto:${owner.email}`}>{owner.email}</a>],
  ];

  return (
    <dl className="grid gap-x-6 gap-y-3 rounded-xl bg-ink/5 p-5 min-[36rem]:grid-cols-[auto_1fr]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-xs font-bold uppercase tracking-[.12em] text-ink/60 min-[36rem]:pt-1">{label}</dt>
          <dd className="font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Página legal: resumen e índice fijos a un lado y el documento en una hoja al otro. */
export async function LegalPage({ title, lead, path, summary, sections }: Readonly<{
  title: string;
  lead: string;
  path: string;
  summary: string[];
  sections: LegalSection[];
}>) {
  const t = await getTranslations("legal");

  return (
    <PageShell>
      <PageHero title={title} lead={lead} crumbs={[{ label: title, href: path }]} action={false} />
      <div className="section-grid bg-slate px-[var(--page-gutter)] pb-[clamp(5rem,10vw,9rem)] text-white">
        <div className="mx-auto grid max-w-[80rem] items-start gap-10 min-[64rem]:grid-cols-[20rem_1fr] min-[64rem]:gap-14">
          <div className="grid gap-8 pt-[clamp(3rem,6vw,5rem)] min-[64rem]:sticky min-[64rem]:top-28">
            <aside data-swing-card className="relative -rotate-[1.5deg] rounded-2xl bg-postit p-6 text-ink shadow-card">
              <Image src="/images/pin.svg" alt="" width={32} height={36} data-swing-pin className="absolute -top-5 left-8 h-9 w-auto" />
              <p className="text-xl font-bold leading-tight tracking-[-.02em]">{t("summaryTitle")}</p>
              <ul className="mt-4 grid gap-3">
                {summary.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm font-bold leading-snug">
                    <Image src="/images/check.svg" alt="" width={18} height={21} className="mt-0.5 h-4 w-auto shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </aside>
            <nav aria-label={t("indexTitle")} className="hidden min-[64rem]:block">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">{t("indexTitle")}</p>
              <ol className="mt-3 grid border-l border-white/15">
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#s${index + 1}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-white/70 transition-colors hover:border-primary hover:text-primary">{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="relative z-10 rounded-2xl bg-white p-[clamp(1.5rem,4vw,3.5rem)] text-ink shadow-card min-[64rem]:-mt-10">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-ink/60">{t("updated")} <time dateTime={owner.legalUpdated}>{owner.legalUpdatedLabel}</time></p>
            {sections.map((section, index) => (
              <section key={section.title} id={`s${index + 1}`} className="mt-10 scroll-mt-28 border-t border-ink/12 pt-10 first-of-type:mt-6 first-of-type:border-t-0 first-of-type:pt-0">
                <h2 className="flex items-start gap-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold leading-tight tracking-[-.02em]">
                  <span aria-hidden="true" className="mt-[.1em] flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold tracking-normal text-white">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <div className="mt-5 grid max-w-[68ch] gap-4 leading-relaxed text-ink/85 min-[40rem]:pl-13 [&_strong]:text-ink [&_ul.dots]:grid [&_ul.dots]:gap-3 [&_ul.dots>li]:relative [&_ul.dots>li]:pl-5 [&_ul.dots>li]:before:absolute [&_ul.dots>li]:before:left-0 [&_ul.dots>li]:before:top-[.6em] [&_ul.dots>li]:before:size-2 [&_ul.dots>li]:before:rounded-full [&_ul.dots>li]:before:bg-primary">{section.content}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
