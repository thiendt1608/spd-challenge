import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { SectionBand } from "@/components/adyen/SectionBand";
import { MonoEyebrow } from "@/components/adyen/MonoEyebrow";
import { AdyenButton } from "@/components/adyen/AdyenButton";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="bg-adyen-canvas min-h-screen font-sans">
      <TopNav />

      {/* Hero Section */}
      <SectionBand variant="dark" className="pt-[240px] pb-[120px] relative overflow-hidden">
        {/* Simulating the photographic background with a subtle gradient overlay since we don't have a real photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1e2e] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] mx-auto px-4">
          <MonoEyebrow className="mb-8">INTELLIGENT TEAM FORMATION</MonoEyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-[1.02] tracking-tight mb-8">
            Team-building you can bank on.
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-medium max-w-2xl mb-12">
            Adyen delivers the control, reliability, and expertise to match the perfect team for your most critical projects.
          </p>
          <Link href="/dashboard">
            <AdyenButton className="w-[180px]">Talk to our team</AdyenButton>
          </Link>
        </div>
      </SectionBand>

      {/* Value Proposition Section (Light) */}
      <SectionBand variant="light" className="py-[120px]">
        <div className="max-w-[800px] mx-auto text-center mb-20">
          <h2 className="text-[32px] md:text-[48px] font-medium text-adyen-ink leading-tight mb-6">
            Run your business with confidence.
          </h2>
          <p className="text-xl text-adyen-ink-muted">
            Thuật toán 2 giai đoạn của chúng tôi xử lý hàng ngàn tổ hợp trong nháy mắt, đảm bảo độ bao phủ kỹ năng 100% với chi phí nhân sự tối ưu nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 rounded-adyen border-adyen-surface-3/10 shadow-none bg-adyen-light">
            <MonoEyebrow className="text-adyen-canvas mb-6">01. PRE-PROCESSING</MonoEyebrow>
            <h3 className="text-xl font-medium text-adyen-canvas mb-4">Loại bỏ nhiễu</h3>
            <p className="text-adyen-ink-muted">
              Tự động càn quét và loại bỏ các hồ sơ không khớp yêu cầu, giúp tối ưu hóa không gian tìm kiếm thuật toán lên đến 80%.
            </p>
          </Card>
          <Card className="p-8 rounded-adyen border-adyen-surface-3/10 shadow-none bg-[#e6e4e2]">
            <MonoEyebrow className="text-adyen-canvas mb-6">02. COMBINATIONS</MonoEyebrow>
            <h3 className="text-xl font-medium text-adyen-canvas mb-4">Duyệt tổ hợp</h3>
            <p className="text-adyen-ink-muted">
              Sử dụng Backtracking để đánh giá mọi phương án. Không bỏ sót bất kỳ một đội hình tiềm năng nào.
            </p>
          </Card>
          <Card className="p-8 rounded-adyen border-adyen-surface-3/10 shadow-none bg-adyen-light">
            <MonoEyebrow className="text-adyen-canvas mb-6">03. OPTIMIZATION</MonoEyebrow>
            <h3 className="text-xl font-medium text-adyen-canvas mb-4">Tối ưu chi phí</h3>
            <p className="text-adyen-ink-muted">
              Động cơ Weighted Scoring xếp hạng đội hình. Thưởng cho độ đa nhiệm, phạt sự dư thừa kỹ năng.
            </p>
          </Card>
        </div>
      </SectionBand>

      {/* Promo Band (Dark) */}
      <SectionBand variant="dark" className="py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[32px] md:text-[48px] font-medium text-white leading-tight mb-6">
              Control every aspect of your resource.
            </h2>
            <div className="space-y-6 mt-12">
              <div className="border-b border-[#2f3e4d] pb-6">
                <h3 className="text-xl font-medium text-white">Accept dynamic constraints</h3>
              </div>
              <div className="border-b border-[#2f3e4d] pb-6">
                <h3 className="text-xl font-medium text-white">Send precise exception reports</h3>
              </div>
              <div className="border-b border-[#2f3e4d] pb-6">
                <h3 className="text-xl font-medium text-white">Adyen for Platforms</h3>
              </div>
            </div>
          </div>
          <div className="bg-[#0d1e2e] h-[400px] rounded-adyen flex items-center justify-center p-12 text-center">
            <p className="text-white/50 font-mono">Interactive Dashboard Preview</p>
          </div>
        </div>
      </SectionBand>

      {/* Footer */}
      <footer className="bg-adyen-canvas py-[72px] px-6">
        <div className="max-w-[1280px] mx-auto text-adyen-ink-tertiary text-sm">
          <p>© 2026 SPD Challenge Team Matching Prototype.</p>
        </div>
      </footer>
    </div>
  );
}