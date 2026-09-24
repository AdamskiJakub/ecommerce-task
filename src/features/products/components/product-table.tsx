import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTableRow } from "@/features/products/components/product-table-row";
import type { Product } from "@/features/products/types";

interface ProductTableProps {
  products: Product[];
  footer?: ReactNode;
}

const columns = [
  { label: "Nazwa", width: "w-[28.79%]" },
  { label: "SKU", width: "w-[14.24%]" },
  { label: "Kategoria", width: "w-[14.24%]" },
  { label: "Cena Brutto", width: "w-[14.24%]" },
  { label: "Status", width: "w-[14.24%]" },
  { label: "Magazyn", width: "w-[14.24%]" },
] as const;

export function ProductTable({ products, footer }: ProductTableProps) {
  return (
    <div className="hidden w-full overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:block">
      <Table className="w-full min-w-200 table-fixed lg:min-w-full">
        <TableHeader>
          <TableRow className="h-10 border-[#E5E5E5] bg-[#F9FAFB] hover:bg-[#F9FAFB]">
            {columns.map((column) => (
              <TableHead
                key={column.label}
                className={`${column.width} h-10 px-4 py-0 text-sm leading-5 font-medium text-[#737373]`}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>

      {footer}
    </div>
  );
}
