"use client";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const LaserFlow = dynamic(() => import('@/components/ui/LaserFlow'), { ssr: false });

interface SectionBandProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "dark" | "light";
  children: React.ReactNode;
}

export function SectionBand({ variant = "light", className, children, ...props }: SectionBandProps) {
  const isDark = variant === "dark";
  
  return (
    <section 
      className={cn(
        "w-full py-16 md:py-[72px] lg:py-[120px] transition-colors duration-500 relative overflow-hidden", 
        isDark 
          ? "bg-adyen-canvas text-white" 
          : "bg-adyen-light text-adyen-canvas",
        className
      )}
      {...props}
    >
      {isDark && (
        <LaserFlow 
          className="absolute inset-0 z-0 pointer-events-auto"
          color="#00d16a" 
          wispDensity={2}
          horizontalBeamOffset={0.5}
          verticalBeamOffset={0.5}
          flowSpeed={0.5}
        />
      )}
      <div className="max-w-[1280px] mx-auto px-6 grid-cols-12 gap-6 relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
