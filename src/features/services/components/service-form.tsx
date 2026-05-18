import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ServiceFormProps = {
  action: (formData: FormData) => Promise<void>;
  service?: Service | null;
  submitLabel: string;
};

export function ServiceForm({ action, service, submitLabel }: ServiceFormProps) {
  return (
    <form action={action} className="grid gap-6">
      <Card>
        <CardContent className="grid gap-5 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="اسم الخدمة"
              name="name"
              defaultValue={service?.name ?? ""}
              placeholder="مثال: إدارة حسابات التواصل"
              required
            />
            <Input
              label="السعر"
              name="price"
              defaultValue={service?.price ?? ""}
              placeholder="مثال: 2500 ريال شهريًا أو حسب النطاق"
            />
            <Input
              label="المدة"
              name="duration"
              defaultValue={service?.duration ?? ""}
              placeholder="مثال: شهر، أسبوعان، 3 أيام"
            />
          </div>

          <Textarea
            label="وصف الخدمة"
            name="description"
            defaultValue={service?.description ?? ""}
            placeholder="اكتب وصفًا واضحًا للخدمة، نطاقها، وما يحصل عليه العميل."
            minLength={10}
            required
          />

          <Textarea
            label="المميزات"
            hint="اكتب المميزات مفصولة بفواصل أو كل ميزة في سطر."
            name="features"
            defaultValue={service?.features.join(", ") ?? ""}
            placeholder="ميزة 1، ميزة 2، ميزة 3"
          />

          <Textarea
            label="الجمهور المستهدف"
            name="targetAudience"
            defaultValue={service?.targetAudience ?? ""}
            placeholder="لمن تناسب هذه الخدمة؟"
          />

          <Input
            label="رابط المرفق"
            hint="رفع الملفات الفعلي سيتم في مرحلة الملفات."
            name="attachmentUrl"
            defaultValue={service?.attachmentUrl ?? ""}
            placeholder="https://example.com/service-brief.pdf"
            type="url"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
