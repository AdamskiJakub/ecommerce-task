import { ProductStatusBadge } from "@/features/products/components/product-status-badge";
import { formatGrossPrice } from "@/features/products/lib/format";
import type { Product } from "@/features/products/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex w-full flex-col gap-2 rounded-xl border border-[#E5E5E5] bg-white p-3">
      <div className="flex h-11 items-center gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h3 className="truncate text-base leading-6 font-medium text-[#0A0A0A]">
            {product.name}
          </h3>
          <p className="truncate text-xs leading-4 font-normal text-[#737373]">
            {product.sku}
          </p>
        </div>

        <ProductStatusBadge available={product.available} />
      </div>

      <dl className="flex h-16 items-center gap-1 rounded-[9px] bg-[#F5F5F5] p-3">
        <div className="flex h-10 flex-1 flex-col gap-1">
          <dt className="text-xs leading-4 font-normal text-[#737373]">
            Kategoria
          </dt>
          <dd className="h-5 text-sm leading-5 font-normal text-[#0A0A0A]">
            {product.category}
          </dd>
        </div>

        <div className="flex h-10 flex-1 flex-col gap-1">
          <dt className="text-xs leading-4 font-normal text-[#737373]">
            Cena brutto
          </dt>
          <dd className="h-5 text-sm leading-5 font-medium text-[#0A0A0A]">
            {formatGrossPrice(product.grossPrice, product.currency)}
          </dd>
        </div>

        <div className="flex h-10 flex-1 flex-col gap-1">
          <dt className="text-xs leading-4 font-normal text-[#737373]">
            Magazyn
          </dt>
          <dd className="h-5 text-sm leading-5 font-normal text-[#0A0A0A]">
            {product.stock ?? "—"}
          </dd>
        </div>
      </dl>
    </article>
  );
}
