"use client";

import { useTeamMatching } from "@/hooks/useTeamMatching";
import { SectionBand } from "@/components/adyen/SectionBand";
import { MonoEyebrow } from "@/components/adyen/MonoEyebrow";
import { SetupForm } from "@/components/SetupForm";
import { CandidateGrid } from "@/components/CandidateGrid";
import { ResultBoard } from "@/components/ResultBoard";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function Home() {
  const { result, error, matchTeam, clearResult } = useTeamMatching();

  return (
    <main>
      {/* Hero Band (Dark) */}
      <SectionBand variant="dark" className="pt-12 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MonoEyebrow className="justify-center mb-6">TEAM MATCHING ENGINE</MonoEyebrow>
          <h1 className="text-[48px] md:text-[64px] font-medium leading-tight tracking-tight mb-6">
            Build your team with confidence.
          </h1>
          <p className="text-xl text-white/70">
            Define constraints. Match candidates. Generate optimal teams.
          </p>
        </div>
        
        <SetupForm onMatch={matchTeam} onStateChange={clearResult} />
      </SectionBand>

      {/* Result & Candidate Pool Band (Light) */}
      <SectionBand variant="light">
        <div className="mb-12">
          <MonoEyebrow className="text-adyen-canvas mb-4">MATCHING RESULT</MonoEyebrow>
          <h2 className="text-[32px] font-medium text-adyen-canvas">Outcome.</h2>
          
          {error && <ErrorAlert error={error} />}
          {result && <ResultBoard result={result} />}
          {!error && !result && (
            <div className="mt-8 p-12 text-center border-2 border-dashed border-adyen-surface-3/20 rounded-adyen text-adyen-ink-muted">
              Nhập kỹ năng và bấm &quot;Tạo Đội Hình&quot; để xem kết quả.
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