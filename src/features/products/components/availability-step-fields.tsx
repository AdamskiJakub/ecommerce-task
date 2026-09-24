import { useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FieldErrors } from "@/features/products/components/field-errors";
import {
  createFieldValidator,
  type ProductFormApi,
} from "@/features/products/lib/form";
import { fieldClassName, labelClassName } from "@/features/products/lib/styles";
import { availabilitySchema } from "@/features/products/schemas/product-form";

interface AvailabilityStepFieldsProps {
  form: ProductFormApi;
}

export function AvailabilityStepFields({ form }: AvailabilityStepFieldsProps) {
  const validateField = useMemo(
    () => createFieldValidator(form, availabilitySchema),
    [form],
  );

  return (
    <div className="flex flex-col gap-4">
      <form.Field name="isAvailable">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Switch
                id={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked)}
              />
              <Label
                htmlFor={field.name}
                className="text-sm leading-5 font-medium text-[#0A0A0A]"
              >
                Produkt jest dostępny
              </Label>
            </div>
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <div className="border-t border-[#E5E5E5]" />

      <form.Field name="limited">
        {(field) => (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => {
                    field.handleChange(checked === true);
                    validateField("stock");
                  }}
                />
                <Label
                  htmlFor={field.name}
                  className="text-sm leading-5 font-medium text-[#0A0A0A]"
                >
                  Produkt limitowany
                </Label>
              </div>
              <FieldErrors errors={field.state.meta.errors} />
            </div>

            {field.state.value ? (
              <form.Field name="stock">
                {(stockField) => (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor={stockField.name} className={labelClassName}>
                      Ilość na magazynie
                    </Label>
                    <Input
                      id={stockField.name}
                      name={stockField.name}
                      type="number"
                      inputMode="numeric"
                      step="1"
                      min="0"
                      value={stockField.state.value ?? ""}
                      placeholder="0"
                      aria-invalid={stockField.state.meta.errors.length > 0}
                      onBlur={stockField.handleBlur}
                      onChange={(event) => {
                        stockField.handleChange(event.target.value);
                        validateField("stock");
                      }}
                      className={fieldClassName}
                    />
                    <FieldErrors errors={stockField.state.meta.errors} />
                  </div>
                )}
              </form.Field>
            ) : null}
          </div>
        )}
      </form.Field>

      <div className="border-t border-[#E5E5E5]" />

      <div className="flex flex-col gap-3">
        <p className="text-sm leading-5 font-medium text-[#0A0A0A]">
          Limity koszyka
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="minCartQuantity">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className={labelClassName}>
                  Minimalna ilość
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="1"
                  value={field.state.value}
                  placeholder="1"
                  aria-invalid={field.state.meta.errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                    validateField("minCartQuantity");
                    validateField("maxCartQuantity");
                  }}
                  className={fieldClassName}
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          <form.Field name="maxCartQuantity">
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className={labelClassName}>
                  Maksymalna ilość
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="numeric"
                  step="1"
                  min="1"
                  value={field.state.value}
                  placeholder="10"
                  aria-invalid={field.state.meta.errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(event.target.value);
                    validateField("maxCartQuantity");
                  }}
                  className={fieldClassName}
                />
                <FieldErrors errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
