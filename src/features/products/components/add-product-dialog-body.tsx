import { AvailabilityStepFields } from "@/features/products/components/availability-step-fields";
import { BasicInfoStepFields } from "@/features/products/components/basic-info-step-fields";
import { PricingStepFields } from "@/features/products/components/pricing-step-fields";
import type { ProductFormApi } from "@/features/products/lib/form";

interface AddProductDialogBodyProps {
  form: ProductFormApi;
  step: number;
}

export function AddProductDialogBody({
  form,
  step,
}: AddProductDialogBodyProps) {
  return (
    <div className="-mt-4 flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pt-4 pb-4 sm:mt-0 sm:px-4 sm:py-5">
      {step === 1 && <BasicInfoStepFields form={form} />}
      {step === 2 && <PricingStepFields form={form} />}
      {step === 3 && <AvailabilityStepFields form={form} />}
    </div>
  );
}
