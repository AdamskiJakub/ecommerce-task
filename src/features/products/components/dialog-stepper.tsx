import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  id: number;
  title: string;
  description: string;
}

interface DialogStepperProps {
  steps: readonly StepperStep[];
  activeStep: number;
  className?: string;
}

export function DialogStepper({
  steps,
  activeStep,
  className,
}: DialogStepperProps) {
  return (
    <ol
      className={cn(
        "mx-4 flex items-start gap-4 border-y border-[#E5E5E5] py-3 sm:mx-0 sm:h-15.5 sm:w-full sm:items-center sm:justify-start sm:gap-4 sm:border-t-0 sm:px-4 sm:py-3",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isActive = step.id === activeStep;
        const isCompleted = step.id < activeStep;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.id} className="flex flex-1 items-center sm:flex-none">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-3">
              <span
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm leading-5 font-semibold transition-colors sm:text-sm sm:leading-5",
                  isActive || isCompleted
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E5E5E5] bg-[#F5F5F5] text-[#737373]",
                )}
              >
                {isCompleted ? <Check className="size-4" /> : step.id}
              </span>
              <span className="flex flex-col gap-0.5 sm:gap-0.5">
                <span
                  className={cn(
                    "text-sm leading-5 font-medium",
                    isActive || isCompleted
                      ? "text-[#0A0A0A]"
                      : "text-[#737373]",
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs leading-4 font-normal text-[#737373]">
                  {step.description}
                </span>
              </span>
            </div>

            {!isLast && (
              <span
                aria-hidden="true"
                className="mx-4 hidden h-px w-16.75 shrink-0 bg-[#E4E4E4] sm:block"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
