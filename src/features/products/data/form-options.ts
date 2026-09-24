export const producers = [
  "Apple",
  "Samsung",
  "Sony",
  "Bosch",
  "Xiaomi",
] as const;

export const categories = [
  "Komputery",
  "Telefony",
  "RTV",
  "AGD",
  "Akcesoria",
] as const;

export const productFeatures = [
  "Bluetooth",
  "WiFi",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Elegancki",
  "Premium",
] as const;

export interface VatRateOption {
  value: string;
  label: string;
  rate: number;
}

export const vatRates: readonly VatRateOption[] = [
  { value: "23", label: "23%", rate: 0.23 },
  { value: "8", label: "8%", rate: 0.08 },
  { value: "5", label: "5%", rate: 0.05 },
  { value: "0", label: "0%", rate: 0 },
  { value: "zw", label: "zw (zwolniony)", rate: 0 },
];

export const currencies = ["PLN", "EUR", "USD"] as const;

export type Producer = (typeof producers)[number];
export type Category = (typeof categories)[number];
export type ProductFeature = (typeof productFeatures)[number];
export type Currency = (typeof currencies)[number];
