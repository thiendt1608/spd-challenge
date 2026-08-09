import { MatchResult } from "@/hooks/useTeamMatching";
import { Card } from "@/components/ui/card";

export function ResultBoard({ result }: { result: MatchResult }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="p-6 bg-adyen-canvas text-white rounded-adyen">
        <h3 className="text-2xl font-medium mb-4">Ghép đội thành công</h3>
        <div className="bg-white/10 p-4 rounded-adyen border border-white/20">
          <p className="text-white/90 text-sm leading-relaxed font-mono">
            {result.reasoning}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {result.team.map((member) => {
          // Find which required skills this member is fulfilling
          const assignedRoles = Object.entries(result.roleMapping)
            .filter(([, name]) => name === member.name)
            .map(([skill]) => skill);

          return (
            <Card key={member.id} className="p-5 rounded-adyen shadow-none border-2 border-adyen-mint bg-adyen-light">
              <h4 className="font-semibold text-adyen-canvas mb-1">{member.name}</h4>
              <p className="text-sm font-medium text-adyen-ink-muted mb-3">Vai trò đảm nhận:</p>
              <div className="flex flex-wrap gap-2">
                {assignedRoles.map(role => (
                  <span key={role} className="bg-adyen-mint text-adyen-canvas text-xs font-medium px-2 py-1 rounded-sm">
                    {role}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}