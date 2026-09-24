import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddProductDialogFooterProps {
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
}

export function AddProductDialogFooter({
  step,
  totalSteps,
  isSubmitting,
  onBack,
}: AddProductDialogFooterProps) {
  const isLastStep = step === totalSteps;

  return (
    <div className="flex h-17 w-full shrink-0 items-center justify-between gap-2 border-t border-[#E5E5E5] bg-[#FAFAFA] p-4">
      {step > 1 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-9 gap-1.5 rounded-[10px] border-[#E5E5E5] bg-transparent px-4 text-sm font-medium text-[#0A0A0A] hover:bg-white hover:text-[#0A0A0A]"
        >
          <ArrowLeft className="size-4" />
          Wstecz
        </Button>
      ) : (
        <span aria-hidden="true" />
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-9 gap-1.5 rounded-[40px] bg-[#2563EB] px-4 text-sm font-medium text-[#FAFAFA] hover:bg-[#1D4ED8]"
      >
        {isLastStep ? (
          "Zapisz produkt"
        ) : (
          <>
            Dalej
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </div>
  );
}
