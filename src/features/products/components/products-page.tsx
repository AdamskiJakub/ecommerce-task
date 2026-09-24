import { useState } from "react";
import { Plus } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { toast } from "sonner";
import { AddProductDialog } from "@/features/products/components/add-product-dialog";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductPagination } from "@/features/products/components/product-pagination";
import { ProductTable } from "@/features/products/components/product-table";
import { products as initialProducts } from "@/features/products/data/products";
import { PAGE_SIZE, toProduct } from "@/features/products/lib/product";
import type { Product } from "@/features/products/types";
import type { ProductFormValues } from "@/features/products/schemas/product-form";

export function ProductsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pageParam, setPageParam] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );

  const totalItems = products.length;
  const pageCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const page = Math.min(Math.max(pageParam, 1), pageCount);

  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (nextPage: number) => {
    void setPageParam(nextPage);
  };

  const handleAddProduct = (values: ProductFormValues) => {
    setProducts((current) => [toProduct(values), ...current]);
    toast.success("Produkt został dodany");
  };

  const pagination = (
    <ProductPagination
      page={page}
      pageCount={pageCount}
      totalItems={totalItems}
      onPageChange={handlePageChange}
    />
  );

  return (
    <main className="min-h-svh bg-[#FAFAFA] md:bg-white">
      <div className="mx-auto box-border flex w-full max-w-310 flex-col gap-4 px-4 py-6 md:gap-6 lg:px-6">
        <header className="flex h-13 items-center justify-between gap-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl leading-7 font-semibold text-[#0A0A0A]">
              Produkty
            </h1>
            <p className="text-sm leading-5 font-normal text-[#737373]">
              {totalItems} produktów w katalogu
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddDialogOpen(true)}
            className="flex h-9 w-37 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-2 text-sm leading-5 font-medium text-[#FAFAFA] transition-colors hover:bg-[#1D4ED8]"
          >
            <Plus className="size-4" />
            Dodaj produkt
          </button>
        </header>

        <AddProductDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddProduct}
        />

        <section className="w-full">
          <ProductTable products={paginatedProducts} footer={pagination} />

          <div className="flex flex-col gap-2 md:hidden">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 md:hidden">{pagination}</div>
        </section>
      </div>
    </main>
  );
}
