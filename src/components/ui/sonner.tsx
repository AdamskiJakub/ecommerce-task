import { Check } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="bottom-right"
      className="toaster group"
      icons={{
        success: (
          <span className="flex size-5 shrink-0 items-center justify-center">
            <span className="flex size-4 items-center justify-center rounded-full bg-[#22C55E]">
              <Check className="size-3 text-white" strokeWidth={3} />
            </span>
          </span>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast flex h-[52px] w-[336px] items-center gap-2 rounded-lg border border-border bg-background p-4 text-sm text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          title: "text-sm leading-5 font-medium text-foreground",
          description: "text-sm text-muted-foreground",
        },
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "0.5rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
