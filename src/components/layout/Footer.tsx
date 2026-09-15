import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { DiscordIcon, XIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/BrandIcons";

type FooterLink = { label: string; anchor?: string; href?: string };
type FooterColumn = { title: string; links: FooterLink[] };

function resolveHref(link: FooterLink) {
  if (link.anchor) return `#${link.anchor}`;
  if (link.href === "discord") return siteConfig.discordUrl;
  return link.href ?? "#";
}

export async function Footer() {
  const t = await getTranslations("footer");
  const columnKeys = ["talent", "companies", "community", "legal"] as const;
  const columns = columnKeys.map(
    (key) => t.raw(`columns.${key}`) as FooterColumn,
  );

  const socialLinks = [
    { href: siteConfig.social.linkedin, label: t("social.linkedin"), Icon: LinkedinIcon },
    { href: siteConfig.social.x, label: t("social.x"), Icon: XIcon },
    { href: siteConfig.social.instagram, label: t("social.instagram"), Icon: InstagramIcon },
    { href: siteConfig.discordUrl, label: t("social.discord"), Icon: DiscordIcon },
  ];

  return (
    <footer className="border-t-2 border-ink/80 bg-board">
      <div className="container-x py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
            <ul aria-label={t("socialLabel")} className="mt-6 flex gap-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-mist"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-bold text-ink">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {column.links.map((link) => {
                  const href = resolveHref(link);
                  const isInternalPage = href.startsWith("/");
                  const isExternal = href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {isInternalPage ? (
                        <Link href={href} className="transition-colors hover:text-ink">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          className="transition-colors hover:text-ink"
                          {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
