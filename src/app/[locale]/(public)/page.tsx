import { AboutSection } from "@/components/public/about-section";
import { ClientsSection } from "@/components/public/clients-section";
import { FinalCtaSection } from "@/components/public/final-cta-section";
import { PublicFooter } from "@/components/public/footer";
import { HeroSection } from "@/components/public/hero-section";
import { MohakkamSection } from "@/components/public/mohakkam-section";
import { PortalPreviewSection } from "@/components/public/portal-preview-section";
import { ProcessSection } from "@/components/public/process-section";
import { ServicesSection } from "@/components/public/services-section";
import { StatsSection } from "@/components/public/stats-section";

type PublicHomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PublicHomePage({ params }: PublicHomePageProps) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <MohakkamSection locale={locale} />
      <ProcessSection />
      <PortalPreviewSection />
      <FinalCtaSection locale={locale} />
      <PublicFooter locale={locale} />
    </main>
  );
}
