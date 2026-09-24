import type { Currency } from "@/features/products/types";

const currencyFormatterCache = new Map<Currency, Intl.NumberFormat>();

function getCurrencyFormatter(currency: Currency): Intl.NumberFormat {
  const cached = currencyFormatterCache.get(currency);
  if (cached) {
    return cached;
  }

  const formatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  currencyFormatterCache.set(currency, formatter);
  return formatter;
}

export function formatGrossPrice(value: number, currency: Currency): string {
  return getCurrencyFormatter(currency).format(value);
}
