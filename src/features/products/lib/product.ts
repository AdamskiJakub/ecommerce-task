import type { Product } from "@/features/products/types";
import type { ProductFormValues } from "@/features/products/schemas/product-form";

export const PAGE_SIZE = 5;

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `product-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function toProduct(values: ProductFormValues): Product {
  return {
    id: createId(),
    name: values.name.trim(),
    sku: values.sku.trim(),
    category: values.category,
    grossPrice: Number(values.priceBrutto),
    currency: values.currency as Product["currency"],
    available: values.isAvailable,
    stock: values.limited ? Number(values.stock) : null,
  };
}
