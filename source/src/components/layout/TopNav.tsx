import Link from "next/link";
import { AdyenButton } from "@/components/adyen/AdyenButton";

export function TopNav() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-[60px] text-white">
      <div className="font-bold text-xl tracking-tight">SPD MATCH.</div>
      
      <div className="hidden md:flex items-center gap-8 text-[16.5px]">
        <Link href="#" className="hover:text-white/80 transition-colors">Sản phẩm</Link>
        <Link href="#" className="hover:text-white/80 transition-colors">Giải pháp</Link>
        <Link href="#" className="hover:text-white/80 transition-colors">Tài liệu</Link>
        <Link href="#" className="hover:text-white/80 transition-colors">Bảng giá</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="#" className="hidden sm:block text-[16.5px] hover:text-white/80 font-medium px-3 py-2">
          Đăng nhập
        </Link>
        <Link href="/dashboard">
          <AdyenButton>Vào Dashboard</AdyenButton>
        </Link>
      </div>
    </nav>
  );
}