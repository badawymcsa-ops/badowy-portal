import { Card, CardContent } from "@/components/ui/card";
import { publicStats } from "@/components/public/public-data";

export function StatsSection() {
  return (
    <section className="border-b border-bd-border bg-white/[0.02] py-10">
      <div className="bd-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {publicStats.map((stat) => (
          <Card key={stat.label} className="bg-bd-surface/80">
            <CardContent className="pt-6">
              <p className="text-3xl font-black text-bd-text">{stat.value}</p>
              <h3 className="mt-3 text-base font-bold text-bd-text">{stat.label}</h3>
              <p className="mt-2 text-sm leading-6 text-bd-muted">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
