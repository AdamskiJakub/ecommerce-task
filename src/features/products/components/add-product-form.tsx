import { AddProductDialogBody } from "@/features/products/components/add-product-dialog-body";
import { AddProductDialogFooter } from "@/features/products/components/add-product-dialog-footer";
import { useProductForm } from "@/features/products/lib/form";
import {
  availabilitySchema,
  basicInfoSchema,
  pricingSchema,
  productFormSchema,
  type ProductFormValues,
} from "@/features/products/schemas/product-form";

interface AddProductFormProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: (values: ProductFormValues) => void;
  onSubmit: (values: ProductFormValues) => void;
}

function getStepSchema(step: number) {
  switch (step) {
    case 1:
      return basicInfoSchema;
    case 2:
      return pricingSchema;
    default:
      return availabilitySchema;
  }
}

export function AddProductForm({
  step,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
}: AddProductFormProps) {
  const isLastStep = step === totalSteps;
  const form = useProductForm();

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        const value = form.state.values;

        const schema = isLastStep ? productFormSchema : getStepSchema(step);
        const result = schema.safeParse(value);

        if (!result.success) {
          for (const issue of result.error.issues) {
            const field = issue.path[0];
            if (typeof field === "string") {
              form.setFieldMeta(field as keyof ProductFormValues, (meta) => ({
                ...meta,
                errorMap: { ...meta.errorMap, onSubmit: issue.message },
              }));
            }
          }
          return;
        }

        if (isLastStep) {
          onSubmit(value);
          return;
        }

        onNext(value);
      }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <AddProductDialogBody form={form} step={step} />

      <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
        {([isSubmitting]) => (
          <AddProductDialogFooter
            step={step}
            totalSteps={totalSteps}
            isSubmitting={isSubmitting}
            onBack={onBack}
          />
        )}
      </form.Subscribe>
    </form>
  );
}
