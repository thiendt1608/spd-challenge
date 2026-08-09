import Link from "next/link";
import { MonoEyebrow } from "@/components/adyen/MonoEyebrow";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-adyen-canvas">
      <header className="h-[60px] border-b border-white/10 flex items-center px-6 justify-between bg-adyen-canvas sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg tracking-tight text-white mr-4">SPD MATCH.</Link>
          <MonoEyebrow className="text-white/70 hidden sm:flex">MANAGER PORTAL</MonoEyebrow>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-adyen-mint text-adyen-canvas font-bold flex items-center justify-center text-sm">
            M
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}