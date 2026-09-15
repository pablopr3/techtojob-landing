import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Hash, X, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";
import { richTags } from "@/lib/rich-text";
import {
  ArrowDoodle,
  SparkDoodle,
  UnderlineDoodle,
  CircleDoodle,
} from "@/components/ui/doodles";

export async function Hero() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");
  const channels = t.raw("mock.channels") as string[];

  return (
    <section className="relative overflow-hidden border-b-2 border-ink/80">
      <div className="container-x grid items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="relative">
          <Doodle className="absolute -left-10 -top-9 hidden w-9 text-brand lg:block">
            <SparkDoodle />
          </Doodle>
          <h1 style={{ "--i": 0 } as CSSProperties} className="hero-in text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            {t.rich("title", {
              ...richTags,
              mark: (chunks) => (
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">{chunks}</span>
                  <Doodle
                    delay={0.4}
                    className="absolute -bottom-2 left-0 h-[0.35em] w-full text-brand"
                  >
                    <UnderlineDoodle className="h-full w-full" />
                  </Doodle>
                </span>
              ),
            })}
          </h1>
          <p style={{ "--i": 1 } as CSSProperties} className="hero-in mt-7 max-w-xl text-lg leading-relaxed text-muted">{t("subtitle")}</p>
          <div style={{ "--i": 2 } as CSSProperties} className="hero-in mt-8">
            <ButtonLink href={siteConfig.discordUrl} target="_blank" rel="noopener" size="lg">
              {tCommon("joinDiscord")}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <p className="mt-3 text-sm text-muted">{t("note")}</p>
          </div>

          <dl style={{ "--i": 3 } as CSSProperties} className="hero-in mt-10 grid gap-4 sm:grid-cols-2">
            <div className="sketch-soft -rotate-1 bg-white p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold text-muted">
                <X size={14} aria-hidden="true" />
                {t("contrast.portal")}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-ink-soft">{t("contrast.portalText")}</dd>
            </div>
            <div className="sketch rotate-1 bg-note p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold text-ink">
                <Check size={14} aria-hidden="true" />
                {t("contrast.here")}
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-snug text-ink">
                {t("contrast.hereText")}
              </dd>
            </div>
          </dl>
        </div>

        {/* Decorative preview of the server, pinned to the board. Hidden from assistive tech. */}
        <div aria-hidden="true" style={{ "--i": 2 } as CSSProperties} className="hero-in relative mx-auto w-full max-w-md pt-6 lg:max-w-none">
          <div className="absolute -left-24 -top-6 z-10 hidden w-32 text-brand lg:block">
            <Doodle delay={0.6}>
              <ArrowDoodle className="w-full" />
            </Doodle>
            <span className="absolute -top-6 left-2 -rotate-6 whitespace-nowrap text-sm font-semibold text-brand">
              {t("arrowLabel")}
            </span>
          </div>
          <div className="tape sketch rotate-[1.5deg] overflow-hidden bg-white shadow-[8px_10px_0_0_rgba(47,52,54,0.12)]">
            <div className="flex">
              <div className="hidden w-40 shrink-0 border-r-2 border-ink/70 bg-mist p-4 sm:block">
                <p className="text-xs font-bold text-ink">{t("mock.serverName")}</p>
                <ul className="mt-4 space-y-1.5">
                  {channels.map((channel, index) => {
                    const isLast = index === channels.length - 1;
                    return (
                      <li
                        key={channel}
                        className={[
                          "relative flex items-center gap-1.5 rounded-md px-2 py-1 text-xs",
                          isLast ? "font-semibold text-ink" : "text-muted",
                        ].join(" ")}
                      >
                        <Hash size={12} />
                        {channel}
                        {isLast ? (
                          <Doodle
                            delay={1}
                            className="absolute -inset-x-1 -inset-y-1 text-brand-deep"
                          >
                            <CircleDoodle className="h-full w-full" />
                          </Doodle>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex-1 p-5">
                <div className="flex items-center gap-1.5 border-b-2 border-line pb-3 text-xs font-semibold text-ink">
                  <Hash size={14} className="text-muted" />
                  {channels[channels.length - 1]}
                </div>
                <div className="mt-5 flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {t("mock.author").charAt(0)}
                  </span>
                  <div>
                    <p className="text-xs">
                      <span className="font-bold text-ink">{t("mock.author")}</span>
                      <span className="ml-2 text-muted">{t("mock.role")}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t("mock.message")}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {t("mock.replyAuthor").charAt(0)}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-ink">{t("mock.replyAuthor")}</p>
                    <p className="mt-1 rounded-xl rounded-tl-sm bg-brand-tint px-3 py-2 text-sm leading-relaxed text-ink">
                      {t("mock.reply")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
