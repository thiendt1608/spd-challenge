import { useState } from 'react';
import candidatesData from '@/data/candidates.json';

export interface Candidate {
  id: string;
  name: string;
  skills: string[];
}

export interface MatchResult {
  team: Candidate[];
  roleMapping: Record<string, string>; // skill -> candidate.name
  reasoning: string; // Business logic explanation
}

export function useTeamMatching() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const matchTeam = (requiredSkills: string[], maxMembers: number) => {
    setResult(null);
    setError(null);

    if (requiredSkills.length === 0) {
      setError("Vui lòng thêm ít nhất 1 kỹ năng yêu cầu.");
      return;
    }

    // --- BƯỚC 1: TIỀN XỬ LÝ (PRE-PROCESSING) ---
    // Loại bỏ những ứng viên không có bất kỳ kỹ năng nào khớp với yêu cầu để giảm size N
    const relevantCandidates = candidatesData.filter(c => 
      c.skills.some(s => requiredSkills.includes(s))
    );

    // Kiểm tra xem kho dữ liệu có đủ 100% kỹ năng yêu cầu không
    const poolSkills = new Set(relevantCandidates.flatMap(c => c.skills));
    const missingSkills = requiredSkills.filter(skill => !poolSkills.has(skill));
    
    if (missingSkills.length > 0) {
      setError(`Hệ thống vô nghiệm. Kho dữ liệu đang thiếu hụt kỹ năng: ${missingSkills.join(", ")}`);
      return;
    }

    // --- BƯỚC 2: TÌM TẤT CẢ TỔ HỢP HỢP LỆ (STAGE 1 - BACKTRACKING) ---
    const validTeams = getAllValidCombinations(relevantCandidates, maxMembers, requiredSkills);

    if (validTeams.length === 0) {
      setError(`Không tìm thấy tổ hợp. Giới hạn ${maxMembers} thành viên là quá ít để bao phủ toàn bộ các kỹ năng yêu cầu.`);
      return;
    }

    // --- BƯỚC 3: TỐI ƯU HÓA & XẾP HẠNG (STAGE 2 - SCORING) ---
    let bestTeam: Candidate[] = [];
    let bestScore = -Infinity;
    let minRedundancy = Infinity;

    for (const team of validTeams) {
      // 1. Độ đa nhiệm: Team size càng nhỏ (tức là 1 người cân nhiều việc) -> điểm càng cao
      const multiTaskingScore = 10 * (requiredSkills.length / team.length);
      
      // 2. Độ dư thừa: Tổng số kỹ năng của cả team - số kỹ năng thực sự cần (Penalty)
      const totalSkillsInTeam = team.reduce((acc, c) => acc + c.skills.length, 0);
      const redundancy = totalSkillsInTeam - requiredSkills.length;
      const redundancyPenalty = 2 * redundancy;

      const finalScore = multiTaskingScore - redundancyPenalty;

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestTeam = team;
        minRedundancy = redundancy;
      }
    }

    // --- BƯỚC 4: GIẢI THÍCH (EXPLAINABILITY) ---
    const roleMapping: Record<string, string> = {};
    for (const reqSkill of requiredSkills) {
      const person = bestTeam.find(c => c.skills.includes(reqSkill));
      if (person) {
        roleMapping[reqSkill] = person.name;
      }
    }

    // Tìm ra những "siêu nhân" (người đảm nhận từ 2 role trở lên trong team)
    const roleCounts: Record<string, number> = {};
    Object.values(roleMapping).forEach(name => {
      roleCounts[name] = (roleCounts[name] || 0) + 1;
    });
    const supermen = Object.keys(roleCounts).filter(name => roleCounts[name] > 1);

    let reasoning = `Tối ưu hóa nhân sự thành công. Team được chọn có size lý tưởng (${bestTeam.length}/${maxMembers} người) để bao phủ 100% kỹ năng. `;
    if (supermen.length > 0) {
      reasoning += `Hệ thống ưu tiên chọn ${supermen.join(", ")} vì khả năng đa nhiệm (cân >2 role), giúp tiết kiệm nhân sự. `;
    } else {
      reasoning += `Các thành viên đều là chuyên gia tập trung cho từng role cụ thể. `;
    }
    if (minRedundancy === 0) {
      reasoning += `Đội hình đạt mức hoàn hảo: Không có kỹ năng nào bị dư thừa lãng phí.`;
    } else {
      reasoning += `Chỉ số dư thừa kỹ năng phụ được kiểm soát ở mức thấp (dư ${minRedundancy} kỹ năng).`;
    }

    setResult({ team: bestTeam, roleMapping, reasoning });
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { result, error, matchTeam, clearResult };
}

// Helper: Lấy TẤT CẢ các tổ hợp hợp lệ từ size 1 đến maxMembers
function getAllValidCombinations(
  pool: Candidate[], 
  maxMembers: number, 
  requiredSkills: string[]
): Candidate[][] {
  const validTeams: Candidate[][] = [];
  
  // Duyệt các size từ 1 đến maxMembers
  for (let k = 1; k <= maxMembers; k++) {
    const backtrack = (start: number, currentCombo: Candidate[]) => {
      if (currentCombo.length === k) {
        // Kiểm tra độ bao phủ 100%
        const coveredSkills = new Set(currentCombo.flatMap(c => c.skills));
        const hasAll = requiredSkills.every(skill => coveredSkills.has(skill));
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