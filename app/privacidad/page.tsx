import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage, OwnerDetails, legalLink, type LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { owner, site } from "@/lib/site";

const path = "/privacidad";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy");
  return pageMetadata({ title: t("metaTitle"), description: t("metaDescription"), path });
}

const sections: LegalSection[] = [
  {
    title: "Responsable del tratamiento",
    content: <OwnerDetails />,
  },
  {
    title: "Qué datos tratamos y para qué",
    content: (
      <>
        <p>Esta web es informativa. No tiene registro de usuarios ni formularios que guarden datos en nuestros sistemas. Tratamos datos personales solo en estos casos:</p>
        <ul className="dots">
          <li><strong>Navegación.</strong> Al cargar la web, nuestro proveedor de alojamiento procesa tu dirección IP y datos técnicos del navegador para servir las páginas y protegerlas frente a usos abusivos.</li>
          <li><strong>Contacto por correo.</strong> Si nos escribes a {owner.email}, tratamos tu dirección y el contenido del mensaje para responderte.</li>
          <li><strong>Boletín.</strong> Si te suscribes al boletín, tratamos tu correo electrónico para enviarte el resumen de novedades de la comunidad. Puedes darte de baja en cualquier momento desde el enlace de cada envío.</li>
          <li><strong>Estadísticas.</strong> Podemos medir las visitas de forma agregada con una herramienta que no usa cookies ni identifica a cada visitante.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Base jurídica",
    content: (
      <ul className="dots">
        <li>Interés legítimo en ofrecer la web de forma segura y conocer su uso de manera agregada.</li>
        <li>Tu consentimiento, cuando te suscribes al boletín o nos escribes por iniciativa propia.</li>
      </ul>
    ),
  },
  {
    title: "Con quién compartimos los datos",
    content: (
      <>
        <p>No vendemos datos personales. Solo acceden a ellos los proveedores que hacen posible el servicio:</p>
        <ul className="dots">
          <li><strong>Cloudflare, Inc.</strong>, que aloja y sirve la web y ofrece la medición agregada.</li>
          <li><strong>IONOS</strong>, que presta el servicio de correo electrónico.</li>
          <li><strong>beehiiv, Inc.</strong>, que gestiona el boletín, solo si te suscribes.</li>
        </ul>
        <p>Algunos de estos proveedores están en Estados Unidos. En ese caso la transferencia se ampara en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
      </>
    ),
  },
  {
    title: "Discord y otros servicios externos",
    content: (
      <>
        <p>Para mostrar el número aproximado de miembros de la comunidad, tu navegador hace una consulta directa a Discord al cargar la web, por lo que Discord recibe tu dirección IP. No se le envía ningún otro dato.</p>
        <p>La web enlaza a Discord, LinkedIn, Instagram, X y TikTok. Cuando entras en ellos, el tratamiento de tus datos depende de cada plataforma y de su propia política de privacidad. La comunidad de TechToJob funciona dentro de Discord y se rige por sus condiciones.</p>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <p>Esta web no utiliza cookies propias de análisis ni de publicidad. Nuestro proveedor de alojamiento puede usar cookies técnicas estrictamente necesarias para la seguridad del servicio, que no requieren consentimiento.</p>
    ),
  },
  {
    title: "Cuánto tiempo conservamos los datos",
    content: (
      <ul className="dots">
        <li>Los correos que nos envías, el tiempo necesario para atender tu consulta y, después, el que exija la ley.</li>
        <li>Tu correo en el boletín, hasta que te des de baja.</li>
        <li>Los registros técnicos de navegación, el plazo que aplique el proveedor de alojamiento.</li>
      </ul>
    ),
  },
  {
    title: "Tus derechos",
    content: (
      <>
        <p>Puedes acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, pedir que se limite y solicitar su portabilidad. También puedes retirar tu consentimiento cuando quieras.</p>
        <p>Para ejercer cualquiera de estos derechos, escribe a <a className={legalLink} href={`mailto:${owner.email}`}>{owner.email}</a> indicando qué derecho quieres ejercer.</p>
        <p>Si consideras que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos en <a className={legalLink} href="https://www.aepd.es">www.aepd.es</a>.</p>
      </>
    ),
  },
  {
    title: "Cambios en esta política",
    content: (
      <p>Actualizaremos esta página cuando cambie la web o la forma en que tratamos los datos, por ejemplo cuando {site.name} incorpore perfiles de usuario u ofertas de empleo. La fecha de la última actualización aparece al principio.</p>
    ),
  },
];

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");
  return <LegalPage title={t("title")} lead={t("lead")} path={path} summary={t.raw("summary") as string[]} sections={sections} />;
}
