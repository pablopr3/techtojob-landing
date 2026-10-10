import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsLink } from "@/components/news-link";
import { PageHero, PageShell } from "@/components/page-shell";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function NotFound() {
  const t = await getTranslations();
  const links = [
    ["/", t("notFound.home")],
    ["/talento", t("navigation.talent")],
    ["/empresas", t("navigation.companies")],
    ["/torneos", t("navigation.tournaments")],
    ["/noticias", t("navigation.news")],
  ] as const;

  return (
    <PageShell>
      <PageHero
        title={t("notFound.title")}
        lead={t("notFound.lead")}
        crumbs={[{ label: "404", href: "/404" }]}
        schema={false}
        action={false}
        meta={(
          <ul className="order-last mt-7 flex flex-wrap gap-x-7 gap-y-1">
            {links.map(([href, label]) => (
              <li key={href}><NewsLink href={href} label={label} className="text-white hover:text-primary transition-colors" /></li>
            ))}
          </ul>
        )}
      />
    </PageShell>
  );
}
