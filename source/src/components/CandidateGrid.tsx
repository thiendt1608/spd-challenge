import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import candidatesData from "@/data/candidates.json";

export function CandidateGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {candidatesData.map((candidate) => (
        <Card key={candidate.id} className="p-4 rounded-adyen border-adyen-surface-3/20 shadow-none bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-adyen bg-adyen-light flex items-center justify-center font-mono font-bold text-adyen-canvas">
              {candidate.name.charAt(0)}
            </div>
            <h4 className="font-semibold text-adyen-canvas">{candidate.name}</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.map(skill => (
              <Badge key={skill} variant="outline" className="rounded-adyen text-xs font-normal border-adyen-surface-3/30 text-adyen-ink-muted">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}