import candidatesData from '@/data/candidates.json';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/hooks/useTeamMatching";

export function CandidateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {(candidatesData as unknown as Candidate[]).map((candidate: Candidate) => {
        const isMatched = candidate.status === "Matched";
        return (
          <Card key={candidate.candidate_id} className={`p-5 rounded-adyen shadow-sm border ${isMatched ? 'bg-gray-100 opacity-50 border-gray-200' : 'bg-white border-adyen-surface-3/10'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-adyen-canvas truncate">{candidate.name}</h4>
                <p className="text-xs text-adyen-ink-muted">{candidate.preferred_role}</p>
              </div>
              {isMatched && <Badge variant="secondary" className="text-[10px]">Đã ghép đội</Badge>}
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-adyen-ink-muted mb-1">Tech Stack & Domain</p>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(candidate.tech_stack).map(s => (
                    <span key={s} className="bg-adyen-light text-adyen-ink-muted text-[10px] px-1.5 py-0.5 rounded-sm border border-gray-200">{s} ({candidate.tech_stack[s]})</span>
                  ))}
                  {candidate.domain_knowledge.map((d: string) => (
                    <span key={d} className="bg-indigo-50 text-indigo-700 text-[10px] px-1.5 py-0.5 rounded-sm border border-indigo-100">{d}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-adyen-ink-muted mb-1">Ngoại ngữ</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.languages.map((l: string) => (
                      <span key={l} className="bg-green-50 text-green-700 text-[10px] px-1.5 py-0.5 rounded-sm border border-green-100">{l}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-adyen-ink-muted mb-1">Thời gian</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.availability.map((a: string) => (
                      <span key={a} className="bg-orange-50 text-orange-700 text-[10px] px-1.5 py-0.5 rounded-sm border border-orange-100">{a}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
