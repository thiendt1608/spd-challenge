"use client";

import { useTeamMatching } from "@/hooks/useTeamMatching";
import { SectionBand } from "@/components/adyen/SectionBand";
import { MonoEyebrow } from "@/components/adyen/MonoEyebrow";
import { SetupForm } from "@/components/SetupForm";
import { CandidateGrid } from "@/components/CandidateGrid";
import { ResultBoard } from "@/components/ResultBoard";
import { ErrorAlert } from "@/components/ErrorAlert";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

function AgenticTerminal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1200);
    const timer3 = setTimeout(() => setStep(3), 1800);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-[#001222] p-6 rounded-adyen font-mono text-sm border border-[#00d16a]/30 shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-4"></div>
        <span className="text-gray-400">Agentic Workflow Pipeline</span>
      </div>
      <div className="space-y-2">
        <p className="text-white"><span className="text-blue-400">[NLP Agent]</span>: Bóc tách ngôn ngữ tự nhiên thành JSON constraints... <span className="text-[#00d16a]">Done</span></p>
        {step >= 1 && <p className="text-white"><span className="text-purple-400">[Combinatorial Agent]</span>: Generating valid intersections & evaluating Set Cover... <span className="text-[#00d16a]">Done</span></p>}
        {step >= 2 && <p className="text-white"><span className="text-yellow-400">[Culture Fit Agent]</span>: Applying Multi-tasking & Team-player bonuses... <span className="text-[#00d16a]">Done</span></p>}
        {step >= 3 && <p className="text-white"><span className="text-orange-400">[Gemini AI Agent]</span>: Synthesizing final reasoning report from LLM... <span className="animate-pulse">_</span></p>}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { result, error, isGenerating, parsedData, parseAndMatch, clearResult } = useTeamMatching();
  const outcomeRef = useRef<HTMLDivElement>(null);

  // Auto scroll khi bắt đầu generate hoặc khi có kết quả/lỗi
  useEffect(() => {
    if (isGenerating || result || error) {
      setTimeout(() => {
        outcomeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isGenerating, result, error]);

  return (
    <main>
      {/* Hero Band (Dark) */}
      <SectionBand variant="dark" className="pt-12 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MonoEyebrow className="justify-center mb-6">ADYEN EMERGENCY SQUAD (AES)</MonoEyebrow>
          <h1 className="text-[48px] md:text-[64px] font-medium leading-tight tracking-tight mb-6">
            IT Rescue Team Matcher.
          </h1>
          <p className="text-xl text-white/90">
            Hãy ra lệnh cho AI. Chúng tôi sẽ tìm đội hình hoàn hảo cho bạn.
          </p>
        </div>
        
        <SetupForm onMatch={parseAndMatch} onStateChange={clearResult} />
      </SectionBand>

      {/* Result & Candidate Pool Band (Light) */}
      <SectionBand variant="light">
        <div className="mb-12 scroll-mt-6" ref={outcomeRef}>
          <MonoEyebrow className="text-adyen-canvas mb-4">MATCHING RESULT</MonoEyebrow>
          <h2 className="text-[32px] font-medium text-adyen-canvas mb-8">Outcome.</h2>

          {/* Hiển thị các tag đã parse được nếu có */}
          {parsedData && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-white border border-gray-200 rounded-adyen shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Dữ liệu bóc tách từ Prompt:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Max Members</p>
                  <p className="font-mono text-lg font-bold text-adyen-canvas">{parsedData.maxMembers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Chuyên môn</p>
                  <div className="flex flex-wrap gap-1">
                    {parsedData.reqSkills.length > 0 ? parsedData.reqSkills.map((group, i) => <Badge key={i} variant="outline">({group.slice(0,2).join(" | ")}{group.length>2?"...":""})</Badge>) : <span className="text-sm text-gray-400">-</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Ngoại ngữ</p>
                  <div className="flex flex-wrap gap-1">
                    {parsedData.reqLangs.length > 0 ? parsedData.reqLangs.map(s => <Badge key={s} variant="outline">{s}</Badge>) : <span className="text-sm text-gray-400">-</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Thời gian rảnh</p>
                  <div className="flex flex-wrap gap-1">
                    {parsedData.reqAvail.length > 0 ? parsedData.reqAvail.map(s => <Badge key={s} variant="outline">{s}</Badge>) : <span className="text-sm text-gray-400">-</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {error && <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}><ErrorAlert error={error} /></motion.div>}
          {isGenerating && <AgenticTerminal />}
          {result && !isGenerating && <ResultBoard result={result} />}
          {!error && !result && !isGenerating && (
            <div className="mt-8 p-12 text-center border-2 border-dashed border-adyen-surface-3/20 rounded-adyen text-adyen-ink-muted">
              Nhập yêu cầu vào ô văn bản và bấm &quot;Phân Tích Ngôn Ngữ&quot; để AI xử lý.
            </div>
          )}
        </div>

        <div className="mt-24">
          <MonoEyebrow className="text-adyen-canvas mb-4">CANDIDATE POOL</MonoEyebrow>
          <h2 className="text-[32px] font-medium text-adyen-canvas">Available Talent.</h2>
          <CandidateGrid />
        </div>
      </SectionBand>
    </main>
  );
}
