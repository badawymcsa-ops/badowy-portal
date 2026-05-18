import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type DeliverableFormProps = {
  requestId: string;
  canMutate: boolean;
  action: (formData: FormData) => Promise<void>;
};

const deliverableStatusOptions = [
  { value: "FIRST_LOOK", label: "أول تصور" },
  { value: "FINAL_LOOK", label: "النسخة النهائية" },
  { value: "DRAFT", label: "مسودة" }
];

export function DeliverableForm({ requestId, canMutate, action }: DeliverableFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>رفع تسليم جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <input type="hidden" name="requestId" value={requestId} />
          <Input label="عنوان التسليم" name="title" placeholder="مثال: أول تصور للحملة" disabled={!canMutate} required />
          <Textarea
            label="وصف مختصر"
            name="description"
            placeholder="اشرح محتوى النسخة أو ملاحظات مهمة للعميل."
            disabled={!canMutate}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="وسم النسخة" name="versionLabel" placeholder="Version 1 / Final Version" disabled={!canMutate} required />
            <Select
              label="نوع التسليم"
              name="status"
              defaultValue="FIRST_LOOK"
              options={deliverableStatusOptions}
              disabled={!canMutate}
              required
            />
          </div>

          <div className="grid gap-3">
            <div>
              <p className="text-sm font-semibold text-bd-text">روابط الملفات</p>
              <p className="mt-1 text-xs leading-6 text-bd-muted">MVP يدعم 1 إلى 3 روابط ملفات يدويًا إلى حين تفعيل التخزين السحابي.</p>
            </div>
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid gap-3 rounded-bd border border-bd-border bg-white/[0.03] p-3">
                <Input
                  label={`اسم الملف ${index + 1}`}
                  name="filename"
                  placeholder="design-preview.pdf"
                  disabled={!canMutate}
                  required={index === 0}
                />
                <Input
                  label={`رابط الملف ${index + 1}`}
                  name="fileUrl"
                  type="url"
                  placeholder="https://example.com/file.pdf"
                  disabled={!canMutate}
                  required={index === 0}
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <Input label="نوع الملف" name="fileType" placeholder="PDF / PNG / MP4" disabled={!canMutate} />
                  <Input label="حجم الملف بالبايت" name="fileSize" type="number" min="1" placeholder="اختياري" disabled={!canMutate} />
                </div>
              </div>
            ))}
          </div>

          {canMutate ? (
            <Button type="submit">حفظ التسليم</Button>
          ) : (
            <p className="text-sm leading-7 text-bd-muted">دور المشاهد يمكنه الاطلاع فقط ولا يمكنه رفع التسليمات.</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
