import { cn } from "@/lib/utils";

interface SectionBandProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "dark" | "light";
  children: React.ReactNode;
}

export function SectionBand({ variant = "light", className, children, ...props }: SectionBandProps) {
  return (
    <section 
      className={cn(
        "w-full py-16 md:py-[72px] lg:py-[120px] transition-colors duration-500", 
        variant === "dark" 
          ? "bg-adyen-canvas text-white" 
          : "bg-adyen-light text-adyen-canvas",
        className
      )}
      {...props}
    >
      <div className="max-w-[1280px] mx-auto px-6 grid-cols-12 gap-6">
        {children}
      </div>
    </section>
  );
}
