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
import { FieldErrors } from "@/features/products/components/field-errors";
import {
  createFieldValidator,
  type ProductFormApi,
} from "@/features/products/lib/form";
import {
  compactFieldClassName,
  compactLabelClassName,
} from "@/features/products/lib/styles";
import { currencies, vatRates } from "@/features/products/data/form-options";
import {
  parseNumber,
  pricingSchema,
  roundToTwo,
} from "@/features/products/schemas/product-form";

interface PricingStepFieldsProps {
  form: ProductFormApi;
}

function resolveVatRate(vatRate: string): number | null {
  const option = vatRates.find((item) => item.value === vatRate);
  if (!option || vatRate === "zw") {
    return null;
  }
  return option.rate;
}

export function PricingStepFields({ form }: PricingStepFieldsProps) {
  const validateField = useMemo(
    () => createFieldValidator(form, pricingSchema),
    [form],
  );

  const syncPrice = (
    source: "priceNetto" | "priceBrutto",
    rawValue: string,
  ) => {
    const vatRate = resolveVatRate(form.state.values.vatRate);
    const value = parseNumber(rawValue);

    if (vatRate === null || !rawValue || Number.isNaN(value)) {
      return;
    }

    const multiplier = 1 + vatRate;

    if (source === "priceNetto") {
      form.setFieldValue(
        "priceBrutto",
        roundToTwo(value * multiplier).toFixed(2),
      );
      return;
    }

    form.setFieldValue("priceNetto", roundToTwo(value / multiplier).toFixed(2));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="priceNetto">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name} className={compactLabelClassName}>
                Cena netto
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={field.state.value}
                placeholder="0.00"
                aria-invalid={field.state.meta.errors.length > 0}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.handleChange(nextValue);
                  syncPrice("priceNetto", nextValue);
                }}
                className={compactFieldClassName}
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="priceBrutto">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name} className={compactLabelClassName}>
                Cena brutto
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={field.state.value}
                placeholder="0.00"
                aria-invalid={field.state.meta.errors.length > 0}
                onBlur={field.handleBlur}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.handleChange(nextValue);
                  syncPrice("priceBrutto", nextValue);
                }}
                className={compactFieldClassName}
              />
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="vatRate">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name} className={compactLabelClassName}>
                Stawka VAT
              </Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  field.handleChange(value);

                  const vatRate = resolveVatRate(value);
                  const netto = parseNumber(form.state.values.priceNetto);

                  if (
                    vatRate !== null &&
                    form.state.values.priceNetto &&
                    !Number.isNaN(netto)
                  ) {
                    form.setFieldValue(
                      "priceBrutto",
                      roundToTwo(netto * (1 + vatRate)).toFixed(2),
                    );
                  }

                  validateField("vatRate");
                  validateField("priceBrutto");
                }}
              >
                <SelectTrigger
                  id={field.name}
                  size="sm"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="w-full text-xs"
                >
                  <SelectValue placeholder="Wybierz stawkę VAT" />
                </SelectTrigger>
                <SelectContent>
                  {vatRates.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>

        <form.Field name="currency">
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={field.name} className={compactLabelClassName}>
                Waluta
              </Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger
                  id={field.name}
                  size="sm"
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="w-full text-xs"
                >
                  <SelectValue placeholder="Wybierz walutę" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldErrors errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>
    </div>
  );
}
