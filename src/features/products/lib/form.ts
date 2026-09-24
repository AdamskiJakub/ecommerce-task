import { useForm } from "@tanstack/react-form";
import type { z } from "zod";
import {
  productFormDefaultValues,
  type ProductFormValues,
} from "@/features/products/schemas/product-form";

export function useProductForm() {
  return useForm({
    defaultValues: productFormDefaultValues,
    onSubmit: ({ value }: { value: ProductFormValues }) => value,
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;

type FieldName = keyof ProductFormValues;

export function createFieldValidator(form: ProductFormApi, schema: z.ZodType) {
  return (field: FieldName) => {
    const result = schema.safeParse(form.state.values);
    const issue = result.success
      ? undefined
      : result.error.issues.find((item) => item.path[0] === field);

    form.setFieldMeta(field, (meta) => ({
      ...meta,
      errorMap: { ...meta.errorMap, onChange: issue?.message },
    }));
  };
}
