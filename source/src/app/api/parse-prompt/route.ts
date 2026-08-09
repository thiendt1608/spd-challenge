import { NextResponse } from 'next/server';
import candidatesData from '@/data/candidates.json';

const GEMINI_API_KEY = "AIzaSyA7KPNJF7zib6lmW04aqF9OgNCOzl08274";

interface Candidate {
  tech_stack: Record<string, string>;
  domain_knowledge: string[];
}

const allSkills = Array.from(new Set((candidatesData as unknown as Candidate[]).flatMap(c => [...Object.keys(c.tech_stack), ...c.domain_knowledge])));

export async function POST(req: Request) {
  try {
    const { promptText } = await req.json();

    const prompt = `Bạn là một AI Semantic Router siêu việt. Hãy trích xuất yêu cầu lập đội từ câu sau: "${promptText}".

KHO DỮ LIỆU CỦA HỆ THỐNG CHỈ CÓ CÁC KỸ NĂNG SAU: [${allSkills.join(', ')}].

Nhiệm vụ đặc biệt (Semantic Mapping): 
Nếu user dùng từ chung chung (ví dụ "AI", "Frontend", "Web", "Crypto"), hãy tự suy luận và gộp TẤT CẢ các kỹ năng có liên quan trong KHO DỮ LIỆU thành một nhóm (Array). 
Ví dụ: User nói "Cần 1 team làm AI và Frontend".
=> Nhóm 1 (AI): ["Agentic AI", "RAG", "Machine Learning", "Python"]
=> Nhóm 2 (Frontend): ["React", "Frontend", "Svelte", "Tailwind", "Angular"]

Hãy trả về ĐÚNG 1 object JSON với cấu trúc sau:
{
  "maxMembers": <số nguyên, mặc định 5>,
  "reqSkills": [
    [<Nhóm từ khóa tương đồng 1>],
    [<Nhóm từ khóa tương đồng 2>]
  ],
  "reqLangs": [<mảng ngoại ngữ>],
  "reqAvail": [<chỉ chọn: "Ca Sáng", "Ca Chiều", "Ca Tối", "Cuối tuần", "Full-time">]
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    
    const aiText = data.candidates[0].content.parts[0].text.trim();
    const parsed = JSON.parse(aiText);
    
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
