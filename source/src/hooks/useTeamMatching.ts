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
  maxMembers: number;
}

export interface ParsedConstraints {
  maxMembers: number;
  reqSkills: string[][]; // Array of groups (Semantic OR logic)
  reqLangs: string[];
  reqAvail: string[];
}

export function useTeamMatching() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedConstraints | null>(null);

  const fallbackRegexParse = (text: string): ParsedConstraints => {
    const maxMembersMatch = text.match(/(\d+)\s*(người|thành viên|members|dev)/i);
    const maxMembers = maxMembersMatch ? parseInt(maxMembersMatch[1], 10) : 5;
    const reqAvail: string[] = [];
    if (text.match(/sáng/i)) reqAvail.push("Ca Sáng");
    if (text.match(/chiều/i)) reqAvail.push("Ca Chiều");
    if (text.match(/tối/i)) reqAvail.push("Ca Tối");
    if (text.match(/cuối tuần/i)) reqAvail.push("Cuối tuần");
    if (text.match(/full-time/i)) reqAvail.push("Full-time");
    const reqLangs: string[] = [];
    if (text.match(/tiếng anh/i)) reqLangs.push("Tiếng Anh");
    if (text.match(/tiếng nhật/i)) reqLangs.push("Tiếng Nhật N2");
    
    const reqSkills: string[][] = [];
    if (text.match(/AI|Machine Learning|RAG/i)) reqSkills.push(["Agentic AI", "RAG", "Machine Learning", "Python"]);
    if (text.match(/Frontend|Web/i)) reqSkills.push(["React", "Svelte", "Angular", "Vue", "Frontend"]);

    return { maxMembers, reqSkills, reqLangs, reqAvail };
  };

  const parseAndMatch = async (promptText: string) => {
    setResult(null);
    setError(null);
    setParsedData(null);
    setIsGenerating(true);

    if (!promptText.trim()) {
      setError("Vui lòng nhập yêu cầu đội hình.");
      setIsGenerating(false);
      return;
    }

    let parsed: ParsedConstraints;
    try {
      const res = await fetch('/api/parse-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText })
      });
      if (!res.ok) throw new Error("API Parse Failed");
      parsed = await res.json();
    } catch {
      console.warn("Using Regex Fallback for parsing.");
      parsed = fallbackRegexParse(promptText);
    }
    
    await new Promise(r => setTimeout(r, 1000));
    setParsedData(parsed);
    await matchTeam(parsed.reqSkills, parsed.reqLangs, parsed.reqAvail, parsed.maxMembers);
  };

  const matchTeam = async (
    requiredSkillGroups: string[][], 
    requiredLangs: string[], 
    requiredAvail: string[], 
    maxMembers: number
  ) => {
    if (requiredSkillGroups.length === 0 && requiredLangs.length === 0 && requiredAvail.length === 0) {
      setError("AI không tìm thấy yêu cầu cụ thể nào từ văn bản. Vui lòng mô tả rõ hơn.");
      setIsGenerating(false);
      return;
    }

    let relevantCandidates = (candidatesData as unknown as Candidate[]).filter(c => c.status === "Available");

    if (requiredAvail.length > 0) {
      relevantCandidates = relevantCandidates.filter(c => 
        requiredAvail.every(reqTime => c.availability.includes(reqTime))
      );
      if (relevantCandidates.length === 0) {
        setError(`Hệ thống vô nghiệm. Không có ai rảnh vào thời gian: ${requiredAvail.join(", ")}`);
        setIsGenerating(false);
        return;
      }
    }

    // Lọc loại bỏ những người không đáp ứng BẤT KỲ nhóm skill/ngôn ngữ nào (Pre-processing Optimization)
    if (requiredSkillGroups.length > 0 || requiredLangs.length > 0) {
      relevantCandidates = relevantCandidates.filter(c => {
        const cCaps = [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages];
        const satisfiesASkillGroup = requiredSkillGroups.some(group => group.some(skill => cCaps.includes(skill)));
        const satisfiesALang = requiredLangs.some(lang => cCaps.includes(lang));
        return satisfiesASkillGroup || satisfiesALang || (requiredSkillGroups.length === 0 && satisfiesALang) || (requiredLangs.length === 0 && satisfiesASkillGroup);
      });

      // Kiểm tra kho dữ liệu xem CÓ THỂ cover toàn bộ Group và Languages không
      const poolCaps = new Set(relevantCandidates.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
      
      const missingGroups = requiredSkillGroups.filter(group => !group.some(skill => poolCaps.has(skill)));
      if (missingGroups.length > 0) {
        const groupNames = missingGroups.map(g => `[${g.slice(0,3).join(", ")}...]`).join(" và ");
        setError(`Hệ thống vô nghiệm. Kho dữ liệu đang thiếu hụt người có chuyên môn thuộc nhóm: ${groupNames}`);
        setIsGenerating(false);
        return;
      }

      const missingLangs = requiredLangs.filter(lang => !poolCaps.has(lang));
      if (missingLangs.length > 0) {
        setError(`Hệ thống vô nghiệm. Kho dữ liệu đang thiếu hụt Ngoại ngữ: ${missingLangs.join(", ")}`);
        setIsGenerating(false);
        return;
      }
    }

    // --- BƯỚC 2: TÌM TẤT CẢ TỔ HỢP HỢP LỆ (GENERALIZED SET COVER BACKTRACKING) ---
    const validTeams = getAllValidCombinations(relevantCandidates, maxMembers, requiredSkillGroups, requiredLangs);

    if (validTeams.length === 0) {
      setError(`Không tìm thấy tổ hợp. Giới hạn ${maxMembers} thành viên là quá ít để bao phủ các yêu cầu dự án.`);
      setIsGenerating(false);
      return;
    }

    // --- BƯỚC 3: TỐI ƯU HÓA & XẾP HẠNG ---
    let bestTeam: Candidate[] = [];
    let bestScore = -Infinity;

    for (const team of validTeams) {
      const multiTaskingScore = 10 * ((requiredSkillGroups.length + requiredLangs.length) === 0 ? 1 : (requiredSkillGroups.length + requiredLangs.length) / team.length);
      const totalCapsInTeam = team.reduce((acc, c) => acc + Object.keys(c.tech_stack).length + c.domain_knowledge.length + c.languages.length, 0);
      // Redundancy assumes we need 1 skill per group + length of langs
      const minRequiredCaps = requiredSkillGroups.length + requiredLangs.length;
      const redundancy = totalCapsInTeam - minRequiredCaps;
      const redundancyPenalty = 2 * redundancy;
      const styleBonus = team.filter(c => c.working_style === "Team player").length * 5;

      const finalScore = multiTaskingScore - redundancyPenalty + styleBonus;

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestTeam = team;
      }
    }

    // Gán roleMapping: Tìm skill thực tế mà candidate dùng để thỏa mãn group
    const roleMapping: Record<string, string> = {};
    requiredSkillGroups.forEach((group, index) => {
      const person = bestTeam.find(c => {
        const caps = [...Object.keys(c.tech_stack), ...c.domain_knowledge];
        return group.some(s => caps.includes(s));
      });
      if (person) {
        // Tìm cụ thể skill nào đã trúng
        const caps = [...Object.keys(person.tech_stack), ...person.domain_knowledge];
        const matchedSkill = group.find(s => caps.includes(s)) || `Group ${index+1}`;
        roleMapping[matchedSkill] = person.name;
      }
    });

    requiredLangs.forEach(lang => {
      const person = bestTeam.find(c => c.languages.includes(lang));
      if (person) roleMapping[lang] = person.name;
    });

    try {
      const response = await fetch('/api/generate-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: bestTeam,
          reqSkills: requiredSkillGroups.map(g => g.join(" hoặc ")),
          reqLangs: requiredLangs,
          reqAvail: requiredAvail,
          maxMembers
        })
      });
      const data = await response.json();
      await new Promise(r => setTimeout(r, 1500));
      setResult({ team: bestTeam, roleMapping, reasoning: data.reasoning, maxMembers });
    } catch {
      setResult({ team: bestTeam, roleMapping, reasoning: "Đội hình lý tưởng đã được AI tự động phân bổ để tối ưu hóa nguồn lực. (Lỗi kết nối Gemini API)", maxMembers });
    } finally {
      setIsGenerating(false);
    }
  };

  const clearResult = () => {
    setResult(null);
    setError(null);
    setParsedData(null);
  };

  return { result, error, isGenerating, parsedData, parseAndMatch, clearResult };
}

function getAllValidCombinations(
  pool: Candidate[], 
  maxMembers: number, 
  requiredSkillGroups: string[][],
  requiredLangs: string[]
): Candidate[][] {
  const validTeams: Candidate[][] = [];
  if (requiredSkillGroups.length === 0 && requiredLangs.length === 0) {
    for(let k=1; k<=maxMembers; k++) pool.forEach(p => validTeams.push([p]));
    return validTeams;
  }
  
  for (let k = 1; k <= maxMembers; k++) {
    const backtrack = (start: number, currentCombo: Candidate[]) => {
      if (currentCombo.length === k) {
        const coveredCaps = new Set(currentCombo.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
        
        // Điều kiện 1: Phải cover ÍT NHẤT 1 skill trong mỗi Group (Semantic OR)
        const hasAllGroups = requiredSkillGroups.every(group => group.some(skill => coveredCaps.has(skill)));
        // Điều kiện 2: Phải cover toàn bộ ngôn ngữ (Semantic AND)
        const hasAllLangs = requiredLangs.every(lang => coveredCaps.has(lang));
        
        if (hasAllGroups && hasAllLangs) {
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
