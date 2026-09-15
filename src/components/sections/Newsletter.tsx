import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { NewsletterForm } from "./NewsletterForm";
import { Doodle } from "@/components/ui/Doodle";
import { EnvelopeDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

export async function Newsletter() {
  const t = await getTranslations("newsletter");
  const tAnchors = await getTranslations("anchors");

  return (
    <section id={tAnchors("newsletter")} className="border-y-2 border-ink/80 bg-brand py-16 text-white lg:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Doodle className="mb-4 w-20 text-highlight">
            <EnvelopeDoodle className="w-full" />
          </Doodle>
          <p className="text-sm font-semibold text-highlight">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {t.rich("title", { ...richTags, mark: (chunks) => <span className="underline decoration-highlight decoration-[3px] underline-offset-[6px]">{chunks}</span> })}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">{t("text")}</p>
        </div>
        <NewsletterForm
          endpoint={siteConfig.newsletterEndpoint}
          labels={{
            email: t("emailLabel"),
            placeholder: t("emailPlaceholder"),
            submit: t("submit"),
            privacy: t("privacy"),
            pending: t("pending"),
            success: t("success"),
            error: t("error"),
          }}
        />
      </div>
    </section>
  );
}
