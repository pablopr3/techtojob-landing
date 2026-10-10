import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage, OwnerDetails, legalLink, type LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { author, site } from "@/lib/site";

const path = "/aviso-legal";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.notice");
  return pageMetadata({ title: t("metaTitle"), description: t("metaDescription"), path });
}

const sections: LegalSection[] = [
  {
    title: "Identificación del titular",
    content: (
      <>
        <p>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico, se informa de los datos del titular de techtojob.com:</p>
        <OwnerDetails />
      </>
    ),
  },
  {
    title: "Objeto de la web",
    content: (
      <p>Esta web presenta {site.name}, una comunidad en español de desarrolladores y empresas del sector tecnológico, e invita a participar en ella a través de Discord. El acceso a la web es gratuito y no requiere registro.</p>
    ),
  },
  {
    title: "Condiciones de uso",
    content: (
      <p>Quien visita la web se compromete a usarla de forma lícita, sin dañar su funcionamiento ni los derechos de terceros. La participación en la comunidad se rige además por las normas del servidor de Discord de {site.name} y por las condiciones de Discord.</p>
    ),
  },
  {
    title: "Propiedad intelectual",
    content: (
      <>
        <p>El nombre, el logotipo y los elementos de marca de {site.name} no pueden utilizarse sin autorización.</p>
        <p>El diseño y el desarrollo original de esta landing son obra de <a className={legalLink} href={author.linkedin}>{author.name}</a>, ganador del torneo de landing pages de la comunidad. La tipografía Sora se usa bajo la licencia SIL Open Font License 1.1 y las bibliotecas de software, bajo sus licencias respectivas.</p>
      </>
    ),
  },
  {
    title: "Contenido ilustrativo",
    content: (
      <p>Las conversaciones, los perfiles y los mensajes que aparecen en las ilustraciones de la web son ejemplos que muestran cómo funciona la comunidad y no corresponden necesariamente a personas reales.</p>
    ),
  },
  {
    title: "Responsabilidad",
    content: (
      <>
        <p>{site.name} facilita el contacto entre personas y empresas, pero no interviene en los procesos de selección ni garantiza la obtención de un empleo o la contratación de un perfil.</p>
        <p>Procuramos que la información de la web sea correcta y esté actualizada, sin poder garantizar que no contenga errores. No respondemos del contenido de las páginas de terceros a las que se enlaza.</p>
      </>
    ),
  },
  {
    title: "Privacidad",
    content: (
      <p>El tratamiento de datos personales se explica en la <a className={legalLink} href="/privacidad">política de privacidad</a>.</p>
    ),
  },
  {
    title: "Legislación aplicable",
    content: <p>Este aviso legal se rige por la legislación española.</p>,
  },
];

export default async function LegalNoticePage() {
  const t = await getTranslations("legal.notice");
  return <LegalPage title={t("title")} lead={t("lead")} path={path} summary={t.raw("summary") as string[]} sections={sections} />;
}
