import { TableCell, TableRow } from "@/components/ui/table";
import { ProductStatusBadge } from "@/features/products/components/product-status-badge";
import { formatGrossPrice } from "@/features/products/lib/format";
import type { Product } from "@/features/products/types";

interface ProductTableRowProps {
  product: Product;
}

export function ProductTableRow({ product }: ProductTableRowProps) {
  return (
    <TableRow className="h-12 border-border hover:bg-transparent">
      <TableCell className="w-89.25 px-4 py-2 text-sm leading-5 font-medium text-foreground">
        {product.name}
      </TableCell>
      <TableCell className="w-[176.6px] px-4 py-2 text-xs leading-4 font-normal text-muted-foreground">
        {product.sku}
      </TableCell>
      <TableCell className="w-[176.6px] px-4 py-2 text-sm leading-5 font-normal text-muted-foreground">
        {product.category}
      </TableCell>
      <TableCell className="w-[176.6px] px-4 py-2 text-sm leading-5 font-medium text-foreground">
        {formatGrossPrice(product.grossPrice, product.currency)}
      </TableCell>
      <TableCell className="w-[176.6px] px-4 py-2">
        <ProductStatusBadge available={product.available} />
      </TableCell>
      <TableCell className="w-[176.6px] px-4 py-2 text-sm leading-5 font-normal text-foreground">
        {product.stock ?? "—"}
      </TableCell>
    </TableRow>
  );
}
