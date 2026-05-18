import { Stepper } from "@/components/forms/stepper";

export const requestSteps = [
  { label: "اختيار المنتجات والخدمات", description: "اربط الطلب بما تريد التسويق له." },
  { label: "نوع الطلب", description: "حدد طبيعة العمل المطلوب." },
  { label: "هدف الحملة", description: "اختر النتيجة التسويقية الأساسية." },
  { label: "المنصات", description: "حدد قنوات النشر أو التنفيذ." },
  { label: "الستايل الإبداعي", description: "حدد النبرة البصرية والمحتوائية." },
  { label: "تفاصيل الحملة", description: "اكتب الرسالة والمراجع والقيود." },
  { label: "التوقيت", description: "حدد البداية والموعد النهائي والاستعجال." },
  { label: "مراجعة وإرسال", description: "راجع الطلب قبل إرساله لفريق بدوي." }
] as const;

export function RequestStepper() {
  return <Stepper steps={[...requestSteps]} currentStep={requestSteps.length - 1} />;
}
