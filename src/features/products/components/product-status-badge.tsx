import { cn } from "@/lib/utils";

interface ProductStatusBadgeProps {
  available: boolean;
  className?: string;
}

export function ProductStatusBadge({
  available,
  className,
}: ProductStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center justify-center rounded-[26px] px-2 py-0.5 text-xs leading-4 font-medium",
        available
          ? "min-w-17.5 bg-[#E8F6ED] text-[#16A34A]"
          : "min-w-21.75 bg-[#FCE9E9] text-[#DC2626]",
        className,
      )}
    >
      {available ? "Dostępny" : "Niedostępny"}
    </span>
  );
}
