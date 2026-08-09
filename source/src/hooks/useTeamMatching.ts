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
  reqSkills: string[];
  reqLangs: string[];
  reqAvail: string[];
}

export function useTeamMatching() {
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedConstraints | null>(null);

  // Fallback regex parser just in case API fails
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
    if (text.match(/tiếng nhật/i)) reqLangs.push("Tiếng Nhật N2"); // mock approx

    // dummy extraction for skills
    const reqSkills: string[] = [];
    const keywords = ["Python", "React", "Go", "Giao tiếp", "Sư phạm", "SQL", "Docker"];
    keywords.forEach(k => {
      if (text.toLowerCase().includes(k.toLowerCase())) reqSkills.push(k);
    });

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
    
    // Simulate delay for UI agentic vibe
    await new Promise(r => setTimeout(r, 1000));
    setParsedData(parsed);

    // Call the core matchmaking logic with parsed data
    await matchTeam(parsed.reqSkills, parsed.reqLangs, parsed.reqAvail, parsed.maxMembers);
  };

  const matchTeam = async (
    requiredSkills: string[], 
    requiredLangs: string[], 
    requiredAvail: string[], 
    maxMembers: number
  ) => {
    const allRequiredCover = [...requiredSkills, ...requiredLangs];

    if (allRequiredCover.length === 0 && requiredAvail.length === 0) {
      setError("AI không tìm thấy yêu cầu cụ thể nào từ văn bản. Vui lòng mô tả rõ hơn.");
      setIsGenerating(false);
      return;
    }

    // --- BƯỚC 1: TIỀN XỬ LÝ (PRE-PROCESSING) ---
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

    if (allRequiredCover.length > 0) {
      relevantCandidates = relevantCandidates.filter(c => {
        const cCaps = [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages];
        return cCaps.some(cap => allRequiredCover.includes(cap));
      });

      const poolCaps = new Set(relevantCandidates.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
      const missingCaps = allRequiredCover.filter(cap => !poolCaps.has(cap));
      
      if (missingCaps.length > 0) {
        setError(`Hệ thống vô nghiệm. Kho dữ liệu đang thiếu hụt năng lực: ${missingCaps.join(", ")}`);
        setIsGenerating(false);
        return;
      }
    }

    // --- BƯỚC 2: TÌM TẤT CẢ TỔ HỢP HỢP LỆ (STAGE 1 - BACKTRACKING) ---
    const validTeams = getAllValidCombinations(relevantCandidates, maxMembers, allRequiredCover);

    if (validTeams.length === 0) {
      setError(`Không tìm thấy tổ hợp. Giới hạn ${maxMembers} thành viên là quá ít để bao phủ 100% yêu cầu dự án.`);
      setIsGenerating(false);
      return;
    }

    // --- BƯỚC 3: TỐI ƯU HÓA & XẾP HẠNG (STAGE 2 - SCORING) ---
    let bestTeam: Candidate[] = [];
    let bestScore = -Infinity;

    for (const team of validTeams) {
      const multiTaskingScore = 10 * (allRequiredCover.length === 0 ? 1 : allRequiredCover.length / team.length);
      const totalCapsInTeam = team.reduce((acc, c) => acc + Object.keys(c.tech_stack).length + c.domain_knowledge.length + c.languages.length, 0);
      const redundancy = totalCapsInTeam - allRequiredCover.length;
      const redundancyPenalty = 2 * redundancy;
      const styleBonus = team.filter(c => c.working_style === "Team player").length * 5;

      const finalScore = multiTaskingScore - redundancyPenalty + styleBonus;

      if (finalScore > bestScore) {
        bestScore = finalScore;
        bestTeam = team;
      }
    }

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

    try {
      const response = await fetch('/api/generate-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          team: bestTeam,
          reqSkills: requiredSkills,
          reqLangs: requiredLangs,
          reqAvail: requiredAvail,
          maxMembers
        })
      });
      const data = await response.json();
      
      await new Promise(r => setTimeout(r, 1500));
      
      setResult({ team: bestTeam, roleMapping, reasoning: data.reasoning, maxMembers });
    } catch {
      setResult({ team: bestTeam, roleMapping, reasoning: "Đội hình lý tưởng đã được AI tự động phân bổ để tối ưu hóa nguồn lực và đảm bảo 100% yêu cầu dự án. (Lỗi kết nối Gemini API)", maxMembers });
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
  requiredCaps: string[]
): Candidate[][] {
  const validTeams: Candidate[][] = [];
  if (requiredCaps.length === 0) {
    for(let k=1; k<=maxMembers; k++) pool.forEach(p => validTeams.push([p]));
    return validTeams;
  }
  for (let k = 1; k <= maxMembers; k++) {
    const backtrack = (start: number, currentCombo: Candidate[]) => {
      if (currentCombo.length === k) {
        const coveredCaps = new Set(currentCombo.flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge, ...c.languages]));
        const hasAll = requiredCaps.every(cap => coveredCaps.has(cap));
        if (hasAll) validTeams.push([...currentCombo]);
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
