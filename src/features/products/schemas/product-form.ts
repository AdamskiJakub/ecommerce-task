import { z } from "zod";

const PRICE_PRECISION = 2;

export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

export function parseNumber(value: string): number {
  return Number(value.replace(",", "."));
}

export const basicInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nazwa produktu musi mieć co najmniej 3 znaki"),
  sku: z
    .string()
    .trim()
    .min(1, "SKU produktu jest wymagane")
    .max(24, "SKU produktu może mieć maksymalnie 24 znaki")
    .regex(/^[A-Za-z0-9]+$/, "SKU może zawierać wyłącznie litery i cyfry"),
  description: z.string().trim().optional(),
  producer: z.string().min(1, "Wybierz producenta"),
  category: z.string().min(1, "Wybierz kategorię"),
  features: z
    .array(z.string())
    .min(1, "Wybierz co najmniej jedną cechę produktu"),
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

export const basicInfoDefaultValues: BasicInfoFormValues = {
  name: "",
  sku: "",
  description: "",
  producer: "",
  category: "",
  features: [],
};

const priceField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} jest wymagana`)
    .refine((value) => !Number.isNaN(parseNumber(value)), {
      message: `${label} musi być liczbą`,
    })
    .refine((value) => parseNumber(value) > 0, {
      message: `${label} musi być większa od 0`,
    });

/**
 * `brutto = netto * (1 + VAT / 100)`.
 *
 * Both price fields are editable, so the schema verifies that the two values
 * stay consistent with the selected VAT rate. The tolerance absorbs the
 * rounding applied while the fields are kept in sync.
 */
const PRICE_TOLERANCE = 0.01;

export const pricingSchema = z
  .object({
    priceNetto: priceField("Cena netto"),
    priceBrutto: priceField("Cena brutto"),
    vatRate: z.string().min(1, "Wybierz stawkę VAT"),
    currency: z.string().min(1, "Wybierz walutę"),
  })
  .refine(
    (values) => {
      const netto = parseNumber(values.priceNetto);
      const brutto = parseNumber(values.priceBrutto);
      const vat = Number(values.vatRate);

      if (Number.isNaN(netto) || Number.isNaN(brutto) || Number.isNaN(vat)) {
        return true;
      }

      const expected = roundToTwo(netto * (1 + vat / 100));
      return Math.abs(expected - brutto) <= PRICE_TOLERANCE;
    },
    {
      message: "Cena brutto musi być zgodna z ceną netto i stawką VAT",
      path: ["priceBrutto"],
    },
  );

export type PricingFormValues = z.infer<typeof pricingSchema>;

export const pricingDefaultValues: PricingFormValues = {
  priceNetto: "",
  priceBrutto: "",
  vatRate: "23",
  currency: "PLN",
};

const quantityField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} jest wymagana`)
    .refine((value) => Number.isInteger(parseNumber(value)), {
      message: `${label} musi być liczbą całkowitą`,
    })
    .refine((value) => parseNumber(value) >= 1, {
      message: `${label} musi być większa lub równa 1`,
    });

const stockField = z
  .string()
  .trim()
  .min(1, "Ilość na magazynie jest wymagana")
  .refine((value) => Number.isInteger(parseNumber(value)), {
    message: "Ilość na magazynie musi być liczbą całkowitą",
  })
  .refine((value) => parseNumber(value) >= 0, {
    message: "Ilość na magazynie nie może być ujemna",
  });

const availabilityShape = {
  isAvailable: z.boolean(),
  limited: z.boolean(),
  stock: z.string().trim(),
  minCartQuantity: quantityField("Minimalna ilość"),
  maxCartQuantity: quantityField("Maksymalna ilość"),
};

interface AvailabilityValues {
  limited: boolean;
  stock: string;
  minCartQuantity: string;
  maxCartQuantity: string;
}

/**
 * Stock is only required when the product is marked as limited. The concrete
 * message comes from `stockField`, so the user sees *why* the value is invalid
 * (empty, not an integer, negative) instead of a generic error.
 */
function validateStock(values: AvailabilityValues): true | string {
  if (!values.limited) {
    return true;
  }

  const result = stockField.safeParse(values.stock);
  return result.success ? true : result.error.issues[0].message;
}

function validateCartQuantityRange(values: AvailabilityValues): true | string {
  const min = parseNumber(values.minCartQuantity);
  const max = parseNumber(values.maxCartQuantity);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return true;
  }

  return max >= min
    ? true
    : "Maksymalna ilość musi być większa lub równa minimalnej";
}

/** Shared refinements so the step schema and the full schema never drift. */
function applyAvailabilityRefinements<T extends z.ZodType<AvailabilityValues>>(
  schema: T,
) {
  return schema
    .refine(validateStock, {
      message: "Ilość na magazynie jest wymagana",
      path: ["stock"],
    })
    .refine(validateCartQuantityRange, {
      message: "Maksymalna ilość musi być większa lub równa minimalnej",
      path: ["maxCartQuantity"],
    });
}

export const availabilitySchema = applyAvailabilityRefinements(
  z.object(availabilityShape),
);

export type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

export const availabilityDefaultValues: AvailabilityFormValues = {
  isAvailable: true,
  limited: false,
  stock: "",
  minCartQuantity: "1",
  maxCartQuantity: "10",
};

export const productFormSchema = applyAvailabilityRefinements(
  basicInfoSchema
    .extend(pricingSchema.shape)
    .extend(availabilityShape)
    .refine(
      (values) => {
        const netto = parseNumber(values.priceNetto);
        const brutto = parseNumber(values.priceBrutto);
        const vat = Number(values.vatRate);

        if (Number.isNaN(netto) || Number.isNaN(brutto) || Number.isNaN(vat)) {
          return true;
        }

        const expected = roundToTwo(netto * (1 + vat / 100));
        return Math.abs(expected - brutto) <= PRICE_TOLERANCE;
      },
      {
        message: "Cena brutto musi być zgodna z ceną netto i stawką VAT",
        path: ["priceBrutto"],
      },
    ),
);

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productFormDefaultValues: ProductFormValues = {
  ...basicInfoDefaultValues,
  ...pricingDefaultValues,
  ...availabilityDefaultValues,
};

export { PRICE_PRECISION };
