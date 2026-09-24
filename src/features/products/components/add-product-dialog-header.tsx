import { X } from "lucide-react";
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AddProductDialogHeader() {
  return (
    <DialogHeader className="gap-0 px-4 pt-6 text-left sm:h-16 sm:justify-center sm:border-b sm:border-[#E5E5E5] sm:px-4 sm:py-6">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-base leading-4 font-medium text-[#0A0A0A]">
          Dodaj nowy produkt
        </DialogTitle>
        <DialogClose className="flex size-4 shrink-0 items-center justify-center rounded-xs text-[#0A0A0A] opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden">
          <X className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Zamknij</span>
        </DialogClose>
      </div>
      <DialogDescription className="sr-only">
        Formularz dodawania nowego produktu
      </DialogDescription>
    </DialogHeader>
  );
}
