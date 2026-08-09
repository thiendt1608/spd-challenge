import { cn } from "@/lib/utils";

interface MonoEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MonoEyebrow({ children, className, ...props }: MonoEyebrowProps) {
  return (
    <div 
      className={cn("flex items-center gap-3 font-mono text-[12px] font-medium tracking-[0px] uppercase", className)} 
      {...props}
    >
      <div className="h-2 w-2 shrink-0 bg-adyen-mint" />
      <span>{children}</span>
    </div>
  );
}