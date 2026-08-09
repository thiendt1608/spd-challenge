"use client";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const PixelBlast = dynamic(() => import('@/components/ui/PixelBlast'), { ssr: false });

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
        <PixelBlast 
          className="absolute inset-0 z-[10] pointer-events-auto"
          color="#27852b" 
          variant="circle"
          pixelSize={6}
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      )}
      <div className="max-w-[1280px] mx-auto px-6 grid-cols-12 gap-6 relative z-[100] pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
