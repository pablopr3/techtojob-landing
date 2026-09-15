import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Talent } from "@/components/sections/Talent";
import { Companies } from "@/components/sections/Companies";
import { Tournaments } from "@/components/sections/Tournaments";
import { Networking } from "@/components/sections/Networking";
import { Testimonials } from "@/components/sections/Testimonials";
import { News } from "@/components/sections/News";
import { Newsletter } from "@/components/sections/Newsletter";
import { Closing } from "@/components/sections/Closing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Talent />
        <Companies />
        <Tournaments />
        <Networking />
        <Testimonials />
        <News />
        <Newsletter />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
