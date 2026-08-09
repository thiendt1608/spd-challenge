"use client";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// Import LaserFlow dynamically to avoid SSR issues with Three.js
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
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <LaserFlow 
            color="#00d16a" 
            wispDensity={2}
            horizontalBeamOffset={0.5}
            verticalBeamOffset={0.5}
            flowSpeed={0.5}
          />
        </div>
      )}
      <div className="max-w-[1280px] mx-auto px-6 grid-cols-12 gap-6 relative z-10">
        {children}
      </div>
    </section>
  );
}
