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
}

export function useTeamMatching() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const matchTeam = (requiredSkills: string[], maxMembers: number) => {
    setResult(null);
    setError(null);

    // 1. Initial Validation: Check if all required skills exist in the pool
    const poolSkills = new Set(candidatesData.flatMap(c => c.skills));
    const missingSkills = requiredSkills.filter(skill => !poolSkills.has(skill));
    
    if (missingSkills.length > 0) {
      setError(`Không tìm thấy tổ hợp. Kho dữ liệu hoàn toàn thiếu kỹ năng: ${missingSkills.join(", ")}`);
      return;
    }

    if (requiredSkills.length === 0) {
      setError("Vui lòng thêm ít nhất 1 kỹ năng yêu cầu.");
      return;
    }

    // 2. Combinatorial Search (Backtracking / Brute-force)
    // We search for the smallest team first (size 1 up to maxMembers)
    for (let k = 1; k <= maxMembers; k++) {
      const combination = getFirstValidCombination(candidatesData, k, requiredSkills);
      if (combination) {
        // Build role mapping
        const roleMapping: Record<string, string> = {};
        for (const reqSkill of requiredSkills) {
          const person = combination.find(c => c.skills.includes(reqSkill));
          if (person) {
            roleMapping[reqSkill] = person.name;
          }
        }

        setResult({ team: combination, roleMapping });
        return;
      }
    }

    // 3. If loop finishes without return, it means maxMembers constraint is too tight
    setError(`Không tìm thấy tổ hợp. Giới hạn ${maxMembers} thành viên là quá ít để bao phủ toàn bộ các kỹ năng yêu cầu.`);
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
  };

  return { result, error, matchTeam, clearResult };
}

// Helper: Get combinations of size k and return the first one that covers all required skills
function getFirstValidCombination(
  pool: Candidate[], 
  k: number, 
  requiredSkills: string[]
): Candidate[] | null {
  const result: Candidate[] = [];
  
  function backtrack(start: number, currentCombo: Candidate[]): Candidate[] | null {
    if (currentCombo.length === k) {
      // Check coverage
      const coveredSkills = new Set(currentCombo.flatMap(c => c.skills));
      const hasAll = requiredSkills.every(skill => coveredSkills.has(skill));
      return hasAll ? [...currentCombo] : null;
    }

    for (let i = start; i < pool.length; i++) {
      currentCombo.push(pool[i]);
      const res = backtrack(i + 1, currentCombo);
      if (res) return res;
      currentCombo.pop();
    }
    return null;
  }

  return backtrack(0, result);
}
