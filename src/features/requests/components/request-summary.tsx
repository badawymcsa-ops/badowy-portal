import { Card, CardContent } from "@/components/ui/card";

export function RequestSummary() {
  return (
    <Card>
      <CardContent className="grid gap-3 pt-6">
        <p className="text-sm font-semibold text-bd-text">مراجعة الطلب قبل الإرسال</p>
        <p className="text-sm leading-7 text-bd-muted">
          تأكد من وضوح الرسالة الرئيسية، الأهداف، المنصات، والموعد النهائي. بعد الإرسال سيصبح الطلب
          في حالة قيد المراجعة حتى يقوم فريق بدوي بمراجعته في مرحلة الإدارة.
        </p>
      </CardContent>
    </Card>
  );
}
