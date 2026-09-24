import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AddProductDialogHeader } from "@/features/products/components/add-product-dialog-header";
import { AddProductForm } from "@/features/products/components/add-product-form";
import {
  DialogStepper,
  type StepperStep,
} from "@/features/products/components/dialog-stepper";
import type { ProductFormValues } from "@/features/products/schemas/product-form";

const steps: readonly StepperStep[] = [
  { id: 1, title: "Informacje", description: "Dane podstawowe" },
  { id: 2, title: "Cena", description: "Dane cenowe" },
  { id: 3, title: "Dostępność", description: "Stany magazynowe" },
];

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ProductFormValues) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddProductDialogProps) {
  const [activeStep, setActiveStep] = useState(1);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setActiveStep(1);
    }
    onOpenChange(nextOpen);
  };

  const handleNext = (_values: ProductFormValues) => {
    setActiveStep((current) => Math.min(current + 1, steps.length));
  };

  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);
    setActiveStep(1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-0 left-0 flex h-svh max-h-svh w-full max-w-full translate-x-0 translate-y-0 flex-col gap-4 overflow-hidden rounded-none border-0 bg-white p-0 shadow-none sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100svh-2rem)] sm:w-full sm:max-w-180 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:gap-0 sm:rounded-[14px] sm:border sm:border-[rgba(10,10,10,0.1)] sm:p-0 sm:shadow-none"
      >
        <AddProductDialogHeader />

        <DialogStepper steps={steps} activeStep={activeStep} />

        <AddProductForm
          step={activeStep}
          totalSteps={steps.length}
          onBack={() => setActiveStep((current) => Math.max(current - 1, 1))}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
