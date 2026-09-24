import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  categories,
  producers,
  productFeatures,
} from "@/features/products/data/form-options";
import { FieldErrors } from "@/features/products/components/field-errors";
import {
  createFieldValidator,
  type ProductFormApi,
} from "@/features/products/lib/form";
import { fieldClassName, labelClassName } from "@/features/products/lib/styles";
import { basicInfoSchema } from "@/features/products/schemas/product-form";

interface BasicInfoStepFieldsProps {
  form: ProductFormApi;
}

export function BasicInfoStepFields({ form }: BasicInfoStepFieldsProps) {
  const validateField = useMemo(
    () => createFieldValidator(form, basicInfoSchema),
    [form],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-1.5 sm:pr-4">
              <Label htmlFor={field.name} className={labelClassName}>
                Nazwa produktu
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="np. MacBook Pro 14"
                aria-invalid={field.state.meta.errors.length > 0}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  validateField("name");
                }}
                className={fieldClassName}
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="sku">
          {(field) => (
            <div className="flex flex-col gap-1.5 sm:pl-4">
              <Label htmlFor={field.name} className={labelClassName}>
                SKU produktu
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="np. MBP14M3PRO"
                aria-invalid={field.state.meta.errors.length > 0}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  validateField("sku");
                }}
                className={fieldClassName}
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name} className={labelClassName}>
              Opis
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value ?? ""}
              placeholder="Krótki opis produktu"
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              className={cn(
                fieldClassName,
                "h-16 min-h-16 resize-none rounded-[10px] px-2.5 py-2",
              )}
            />
            <FieldErrors errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="producer">
          {(field) => (
            <div className="flex flex-col gap-1.5 sm:pr-4">
              <Label htmlFor={field.name} className={labelClassName}>
                Producent
              </Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);
                  validateField("producer");
                }}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={field.state.meta.errors.length > 0}
                  className={cn(fieldClassName, "w-full")}
                >
                  <SelectValue placeholder="Wybierz producenta" />
                </SelectTrigger>
                <SelectContent>
                  {producers.map((producer) => (
                    <SelectItem key={producer} value={producer}>
                      {producer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="category">
          {(field) => (
            <div className="flex flex-col gap-1.5 sm:pl-4">
              <Label htmlFor={field.name} className={labelClassName}>
                Kategoria
              </Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);
                  validateField("category");
                }}
              >
                <SelectTrigger
                  id={field.name}
                  aria-invalid={field.state.meta.errors.length > 0}
                  className={cn(fieldClassName, "w-full")}
                >
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="features">
        {(field) => {
          const selected = field.state.value;

          const toggleFeature = (feature: string) => {
            field.handleChange(
              selected.includes(feature)
                ? selected.filter((item) => item !== feature)
                : [...selected, feature],
            );
            validateField("features");
          };

          return (
            <div className="flex flex-col gap-1.5">
              <Label className={labelClassName}>Cechy produktu</Label>
              <div
                role="group"
                aria-label="Cechy produktu"
                className="flex flex-wrap gap-2"
              >
                {productFeatures.map((feature) => {
                  const isSelected = selected.includes(feature);

                  return (
                    <button
                      key={feature}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleFeature(feature)}
                      className={cn(
                        "inline-flex h-6 items-center rounded-[26px] border px-2 py-0.5 text-sm leading-5 font-normal transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                        isSelected
                          ? "border-[#2563EB] bg-[#2563EB] text-white"
                          : "border-[#E5E5E5] bg-white text-[#737373] hover:bg-[#F5F5F5]",
                      )}
                    >
                      {feature}
                    </button>
                  );
                })}
              </div>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          );
        }}
      </form.Field>
    </div>
  );
}
