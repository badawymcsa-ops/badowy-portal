import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AdminStatCardProps = {
  title: string;
  value: number | string;
  description?: string;
};

export function AdminStatCard({ title, value, description }: AdminStatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-bd-text">{value}</p>
        {description ? <p className="mt-2 text-sm leading-6 text-bd-muted">{description}</p> : null}
      </CardContent>
    </Card>
  );
}
