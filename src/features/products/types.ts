import type { Currency } from "@/features/products/data/form-options";

export type { Currency };

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  grossPrice: number;
  currency: Currency;
  available: boolean;
  stock: number | null;
}
