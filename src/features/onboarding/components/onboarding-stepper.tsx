import { Stepper } from "@/components/forms/stepper";

type OnboardingStepperProps = {
  currentStep: number;
};

export const onboardingSteps = [
  { label: "بيانات الشركة", description: "الاسم، الدولة، والمدينة." },
  { label: "بيانات البراند", description: "الاسم، المجال، الوصف، والموقع." },
  { label: "الهوية البصرية", description: "الألوان، الخطوط، الشعار، والملاحظات." },
  { label: "الجمهور والتوجه", description: "الجمهور، النبرة، التوجه، والأهداف." },
  { label: "روابط التواصل", description: "حسابات المنصات المهمة." },
  { label: "مراجعة وإرسال", description: "تأكيد البيانات قبل الحفظ." }
] as const;

export function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return <Stepper steps={[...onboardingSteps]} currentStep={currentStep} />;
}
