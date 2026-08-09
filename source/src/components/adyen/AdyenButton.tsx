import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdyenButton({ className, variant, ...props }: React.ComponentProps<typeof Button>) {
  // We only support primary (mint) and ghost (transparent) based on Adyen constraints.
  const isGhost = variant === "ghost" || variant === "secondary";
  
  return (
    <Button 
      className={cn(
        "rounded-adyen font-medium px-4 h-12 text-[16.5626px]", // Base constraints
        isGhost 
          ? "bg-transparent text-adyen-canvas hover:bg-white/10" 
          : "bg-adyen-mint text-adyen-canvas hover:bg-[#00c060] transition-colors", // Primary mint
        className
      )} 
      {...props} 
    />
  );
}