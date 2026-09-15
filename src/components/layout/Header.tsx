import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export type NavItem = { label: string; href: string };

export async function Header() {
  const t = await getTranslations();
  const locale = await getLocale();
  const otherLocale = locale === "es" ? "en" : "es";

  const navItems: NavItem[] = [
    { label: t("nav.howItWorks"), href: `#${t("anchors.howItWorks")}` },
    { label: t("nav.talent"), href: `#${t("anchors.talent")}` },
    { label: t("nav.companies"), href: `#${t("anchors.companies")}` },
    { label: t("nav.tournaments"), href: `#${t("anchors.tournaments")}` },
    { label: t("nav.networking"), href: `#${t("anchors.networking")}` },
    { label: t("nav.news"), href: `#${t("anchors.news")}` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/80 bg-board/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t("common.skipToContent")}
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo priority />
        </Link>

        <nav aria-label={t("common.mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-semibold text-ink-soft">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/"
            locale={otherLocale}
            hrefLang={otherLocale}
            aria-label={t("common.switchLocaleAria")}
            className="text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            {t("common.switchLocale")}
          </Link>
          <ButtonLink
            href={siteConfig.discordUrl}
            target="_blank"
            rel="noopener"
          >
            {t("common.joinDiscord")}
          </ButtonLink>
        </div>

        <MobileMenu
          items={navItems}
          discordUrl={siteConfig.discordUrl}
          discordLabel={t("common.joinDiscord")}
          localeLabel={t("common.switchLocale")}
          localeAria={t("common.switchLocaleAria")}
          otherLocale={otherLocale}
          navLabel={t("common.mainNav")}
          openLabel={t("common.openMenu")}
          closeLabel={t("common.closeMenu")}
        />
      </div>
    </header>
  );
}
