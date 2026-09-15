import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";
import { CircleDoodle, SparkDoodle } from "@/components/ui/doodles";
import { richTags } from "@/lib/rich-text";

export async function Closing() {
  const t = await getTranslations("closing");

  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <div className="relative mx-auto max-w-2xl text-center">
          <Doodle className="absolute -left-4 -top-10 w-10 text-brand sm:-left-16">
            <SparkDoodle />
          </Doodle>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {t.rich("title", richTags)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{t("text")}</p>
          <span className="relative mt-10 inline-block">
            <Doodle delay={0.3} className="absolute -inset-x-6 -inset-y-4 text-brand">
              <CircleDoodle className="h-full w-full" />
            </Doodle>
            <ButtonLink
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener"
              size="lg"
              className="relative"
            >
              {t("cta")}
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
          </span>
        </div>
      </div>
    </section>
  );
}
