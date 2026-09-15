import { Link } from "@/i18n/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

type LegalPageProps = { title: string; text: string; back: string };

export function LegalPage({ title, text, back }: LegalPageProps) {
  return (
    <>
      <Header />
      <main id="main" className="container-x py-20">
        <article className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-6 text-base leading-relaxed text-muted">{text}</p>
          <Link href="/" className="mt-8 inline-block text-sm font-semibold text-ink underline underline-offset-4">
            {back}
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
