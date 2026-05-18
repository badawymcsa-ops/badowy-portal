import { cn } from "@/lib/utils";

export type StepperStep = {
  label: string;
  description?: string;
};

type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <li
            key={step.label}
            className={cn(
              "rounded-bd border p-4",
              isActive || isComplete
                ? "border-bd-violet/50 bg-bd-violet/10"
                : "border-bd-border bg-white/[0.03]"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.08] text-xs font-bold text-bd-text">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-bd-text">{step.label}</span>
            </div>
            {step.description ? <p className="mt-2 text-xs leading-6 text-bd-muted">{step.description}</p> : null}
          </li>
        );
      })}
    </ol>
  );
}
