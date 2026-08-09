import { MatchResult } from "@/hooks/useTeamMatching";
import { Card } from "@/components/ui/card";

export function ResultBoard({ result }: { result: MatchResult }) {
  const teamSize = result.team.length;
  const costSaved = Math.max(0, Math.round(((result.maxMembers - teamSize) / result.maxMembers) * 100));
  const teamPlayers = result.team.filter(c => c.working_style === "Team player").length;
  const cultureScore = Math.min(100, Math.round((teamPlayers / teamSize) * 100) + 20); // base 20% + ratio

  return (
    <div className="mt-8 space-y-6">
      <div className="p-6 bg-adyen-canvas text-white rounded-adyen">
        <h3 className="text-2xl font-medium mb-4">Đội hình Đề xuất</h3>
        <div className="bg-white/10 p-4 rounded-adyen border border-white/20 mb-6">
          <p className="text-white/90 text-sm leading-relaxed font-mono">
            <span className="text-[#00d16a] font-bold">[AI LLM Output]:</span> {result.reasoning}
          </p>
        </div>

        {/* DATA VIZ PROGRESS BARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Tech & Domain Coverage</span>
              <span className="text-white">100%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-[#00d16a] h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Cost Efficiency (Saved)</span>
              <span className="text-white">{costSaved}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${costSaved}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Culture Fit Score</span>
              <span className="text-white">{cultureScore}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${cultureScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.team.map((member) => {
          const assignedRoles = Object.entries(result.roleMapping)
            .filter(([, name]) => name === member.name)
            .map(([cap]) => cap);

          return (
            <Card key={member.candidate_id} className="p-5 rounded-adyen shadow-none border-2 border-adyen-mint bg-adyen-light">
              <div className="mb-3 border-b border-gray-200 pb-3">
                <h4 className="font-semibold text-adyen-canvas">{member.name}</h4>
                <p className="text-xs font-mono text-adyen-ink-muted">{member.preferred_role} • {member.working_style}</p>
              </div>
              
              <p className="text-sm font-medium text-adyen-ink-muted mb-2">Đảm nhận yêu cầu (Vai trò):</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {assignedRoles.length > 0 ? assignedRoles.map(role => (
                  <span key={role} className="bg-adyen-mint text-adyen-canvas text-xs font-medium px-2 py-1 rounded-sm">
                    {role}
                  </span>
                )) : <span className="text-xs text-gray-500 italic">Hỗ trợ chung dự án</span>}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="block text-gray-400 font-mono mb-1">THỜI GIAN</span>
                  <span className="font-medium text-gray-700">{member.availability.join(", ")}</span>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <span className="block text-gray-400 font-mono mb-1">NGOẠI NGỮ</span>
                  <span className="font-medium text-gray-700">{member.languages.join(", ")}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
