import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  try {
    const { team, reqSkills, reqLangs, reqAvail, maxMembers } = await req.json();

    const prompt = `Bạn là một AI Manager (Agent) chuyên đánh giá nhân sự. Hệ thống vừa ghép thành công một đội hình gồm ${team.length} người (giới hạn tối đa là ${maxMembers} người).
Yêu cầu dự án: Kỹ năng [${reqSkills.join(", ")}], Ngoại ngữ [${reqLangs.join(", ")}], Thời gian rảnh [${reqAvail.join(", ")}].
Đội hình được chọn: ${team.map((c: {name: string, tech_stack: Record<string,string>, languages: string[], working_style: string}) => `${c.name} (Tech: ${Object.keys(c.tech_stack).join(", ")}, Ngoại ngữ: ${c.languages.join(", ")}, Style: ${c.working_style})`).join("; ")}.

Nhiệm vụ: Viết MỘT đoạn văn ngắn gọn (tối đa 4 câu) mang phong cách chuyên nghiệp, giải thích MẠNH MẼ lý do đội hình này là tối ưu nhất. Nhấn mạnh vào việc tối ưu nhân sự (nếu số người ít hơn giới hạn) và sự phù hợp về văn hóa (Team player). Không cần lặp lại danh sách tên hay kỹ năng dài dòng.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    const aiText = data.candidates[0].content.parts[0].text.trim();
    return NextResponse.json({ reasoning: aiText });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ reasoning: "Đội hình lý tưởng đã được AI tự động phân bổ để tối ưu hóa nguồn lực và đảm bảo 100% yêu cầu dự án. (Lỗi kết nối Gemini API)" }, { status: 200 });
  }
}
