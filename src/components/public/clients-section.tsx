import { Card, CardContent } from "@/components/ui/card";
import { saudiClients } from "@/components/public/public-data";
import { SectionHeading } from "@/components/public/section-heading";

export function ClientsSection() {
  return (
    <section id="clients" className="bd-section">
      <div className="bd-container">
        <SectionHeading
          eyebrow="عملاء وتجارب"
          title="تجارب في السوق السعودي"
          description="نماذج من جهات عملنا معها في مساحات تشمل التحول الرقمي، التسويق الرياضي، النشر الرقمي، الأنظمة الإدارية، وتجربة العملاء."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {saudiClients.map((client) => (
            <Card key={client.name} className="transition hover:border-bd-violet/45">
              <CardContent className="pt-6">
                <p className="text-sm font-black text-bd-violet">{client.number}</p>
                <h3 className="mt-4 text-xl font-bold text-bd-text">{client.name}</h3>
                <p className="mt-4 text-sm leading-7 text-bd-muted">{client.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
