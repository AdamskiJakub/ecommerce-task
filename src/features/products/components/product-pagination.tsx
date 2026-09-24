import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
  page: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function ProductPagination({
  page,
  pageCount,
  totalItems,
  onPageChange,
}: ProductPaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 md:h-16 md:flex-row md:items-center md:justify-between md:border-t md:border-[#E5E5E5] md:bg-[#F9FAFB] md:px-4">
      <p className="text-center text-xs leading-4 font-normal text-[#737373] md:text-left">
        Strona {page} z {pageCount} · {totalItems} produktów
      </p>

      <div className="flex h-8 items-center justify-center gap-0.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-8 w-21.25 items-center justify-center gap-1 rounded-lg py-2 pr-2.5 pl-1.5 text-sm leading-5 font-medium text-[#0A0A0A] transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronLeft className="size-4" strokeWidth={1.5} />
          Wstecz
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-current={pageNumber === page ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-sm leading-5 font-medium transition-colors",
              pageNumber === page
                ? "bg-[#2563EB] text-white"
                : "text-[#0A0A0A] hover:bg-black/5",
            )}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="flex h-8 w-17.5 items-center justify-center gap-1 rounded-lg py-2 pr-1.5 pl-2.5 text-sm leading-5 font-medium text-[#0A0A0A] transition-colors hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50"
        >
          Dalej
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
