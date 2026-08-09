import { useState } from 'react';
import candidatesData from '@/data/candidates.json';

export interface Candidate {
  candidate_id: string;
  name: string;
  tech_stack: Record<string, string>;
  domain_knowledge: string[];
  languages: string[];
  preferred_role: string;
  availability: string[];
  working_style: string;
  status: string;
}

export interface MatchResult {
  team: Candidate[];
  roleMapping: Record<string, string>;
  reasoning: string;
}

export function useTeamMatching() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const matchTeam = (
    requiredSkills: string[], 
    requiredLangs: string[], 
    requiredAvail: string[], 
    maxMembers: number
  ) => {
    setResult(null);
    setError(null);

    const allRequiredCover = [...requiredSkills, ...requiredLangs];

    if (allRequiredCover.length === 0 && requiredAvail.length === 0) {
      setError("Vui lòng thêm ít nhất 1 yêu cầu (Kỹ năng, Ngoại ngữ hoặc Thời gian).");
      return;
    }

    // --- BƯỚC 1: TIỀN XỬ LÝ (PRE-PROCESSING) ---
    // 1. Chỉ lấy những người "Available"
    // 2. Phải thỏa mãn ràng buộc cứng giao nhau (Intersection): 
    //    Nếu dự án yêu cầu "Ca Tối", thì cá nhân đó BẮT BUỘC phải có "Ca Tối" trong availability.
    let relevantCandidates = (candidatesData as unknown as Candidate[]).filter(c => c.status === "Available");

    if (requiredAvail.length > 0) {
      relevantCandidates = relevantCandidates.filter(c => 
        requiredAvail.every(reqTime => c.availability.includes(reqTime))
      );
      if (relevantCandidates.length === 0) {
        setError(`Hệ thống vô nghiệm. Không có ai rảnh vào thời gian: ${requiredAvail.join(", ")}`);
        return;
      }
    }

    // 3. Lọc bỏ những người không có bất kỳ kỹ năng/ngôn ngữ nào khớp yêu cầu (nếu có yêu cầu cover)
    if (allRequiredCover.length > 0) {
      relevantCandidates = relevantCandidates.filter(c => {
        const cCaps = [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages];
        return cCaps.some(cap => allRequiredCover.includes(cap));
      });

      // Kiểm tra xem kho dữ liệu còn lại có đủ 100% kỹ năng/ngôn ngữ yêu cầu không
      const poolCaps = new Set(relevantCandidates.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
      const missingCaps = allRequiredCover.filter(cap => !poolCaps.has(cap));
      
      if (missingCaps.length > 0) {
        setError(`Hệ thống vô nghiệm. Kho dữ liệu đang thiếu hụt năng lực: ${missingCaps.join(", ")}`);
        return;
      }
    }

    // --- BƯỚC 2: TÌM TẤT CẢ TỔ HỢP HỢP LỆ (STAGE 1 - BACKTRACKING) ---
    // Tìm các team thỏa mãn allRequiredCover
    const validTeams = getAllValidCombinations(relevantCandidates, maxMembers, allRequiredCover);

    if (validTeams.length === 0) {
      setError(`Không tìm thấy tổ hợp. Giới hạn ${maxMembers} thành viên là quá ít để bao phủ 100% yêu cầu dự án.`);
      return;
    }

    // --- BƯỚC 3: TỐI ƯU HÓA & XẾP HẠNG (STAGE 2 - SCORING) ---
    let bestTeam: Candidate[] = [];
    let bestScore = -Infinity;
    

    for (const team of validTeams) {
      // 1. Độ đa nhiệm: Team size càng nhỏ -> điểm càng cao
      const multiTaskingScore = 10 * (allRequiredCover.length === 0 ? 1 : allRequiredCover.length / team.length);
      
      // 2. Độ dư thừa: Tổng số năng lực của cả team - số năng lực thực sự cần
      const totalCapsInTeam = team.reduce((acc, c) => acc + Object.keys(c.tech_stack).length + c.domain_knowledge.length + c.languages.length, 0);
      const redundancy = totalCapsInTeam - allRequiredCover.length;
      const redundancyPenalty = 2 * redundancy;

      // 3. Thưởng thêm nếu team có working_style tốt (vd Team player)
      const styleBonus = team.filter(c => c.working_style === "Team player").length * 5;

      const finalScore = multiTaskingScore - redundancyPenalty + styleBonus;

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestTeam = team;
        
      }
    }

    // --- BƯỚC 4: GIẢI THÍCH (EXPLAINABILITY) ---
    const roleMapping: Record<string, string> = {};
    for (const req of allRequiredCover) {
      const person = bestTeam.find(c => {
        const caps = [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages];
        return caps.includes(req);
      });
      if (person) {
        roleMapping[req] = person.name;
      }
    }

    const roleCounts: Record<string, number> = {};
    Object.values(roleMapping).forEach(name => {
      roleCounts[name] = (roleCounts[name] || 0) + 1;
    });
    const supermen = Object.keys(roleCounts).filter(name => roleCounts[name] > 1);

    let reasoning = `Đội hình lý tưởng (${bestTeam.length}/${maxMembers} người). Thỏa mãn 100% ràng buộc đa biến (Kỹ năng, Ngoại ngữ, Thời gian). `;
    if (supermen.length > 0) {
      reasoning += `AI đã ưu tiên chọn ${supermen.join(", ")} vì khả năng gánh vác đa nhiệm (${supermen.map(s => roleCounts[s]).join(", ")} roles), giúp tối ưu chi phí. `;
    } else {
      reasoning += `Các thành viên được phân bổ chuyên môn hóa cao. `;
    }
    
    const teamPlayers = bestTeam.filter(c => c.working_style === "Team player");
    if (teamPlayers.length > 0) {
      reasoning += `Điểm cộng văn hóa (Culture Fit): Có ${teamPlayers.length} thành viên mang working style "Team player". `;
    }

    setResult({ team: bestTeam, roleMapping, reasoning });
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { result, error, matchTeam, clearResult };
}

function getAllValidCombinations(
  pool: Candidate[], 
  maxMembers: number, 
  requiredCaps: string[]
): Candidate[][] {
  const validTeams: Candidate[][] = [];
  
  if (requiredCaps.length === 0) {
    // Nếu chỉ ràng buộc thời gian, chọn ra những team tốt nhất từ pool
    for(let k=1; k<=maxMembers; k++) {
       // just return teams of size k. For simplicity, just return individuals.
       pool.forEach(p => validTeams.push([p]));
    }
    return validTeams;
  }

  for (let k = 1; k <= maxMembers; k++) {
    const backtrack = (start: number, currentCombo: Candidate[]) => {
      if (currentCombo.length === k) {
        const coveredCaps = new Set(currentCombo.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
        const hasAll = requiredCaps.every(cap => coveredCaps.has(cap));
        if (hasAll) {
          validTeams.push([...currentCombo]);
        }
        return;
      }

      for (let i = start; i < pool.length; i++) {
        currentCombo.push(pool[i]);
        backtrack(i + 1, currentCombo);
        currentCombo.pop();
      }
    }
    backtrack(0, []);
  }

  return validTeams;
}
