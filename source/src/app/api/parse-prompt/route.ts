import { NextResponse } from 'next/server';

const GEMINI_API_KEY = "AIzaSyA7KPNJF7zib6lmW04aqF9OgNCOzl08274";

export async function POST(req: Request) {
  try {
    const { promptText } = await req.json();

    const prompt = `Bạn là một AI Parser. Hãy trích xuất các yêu cầu từ câu nói sau của user để phục vụ việc ghép đội IT.
Câu của user: "${promptText}"

Hãy trả về ĐÚNG 1 object JSON với cấu trúc sau (không có markdown):
{
  "maxMembers": <số nguyên, mặc định 5 nếu không nhắc đến>,
  "reqSkills": [<mảng kỹ năng chuyên môn, ví dụ: "Python", "React", "Giao tiếp">],
  "reqLangs": [<mảng ngoại ngữ, ví dụ: "Tiếng Nhật", "Tiếng Anh">],
  "reqAvail": [<mảng thời gian rảnh, CHỈ ĐƯỢC CHỌN TỪ CÁC TỪ KHÓA NÀY: "Ca Sáng", "Ca Chiều", "Ca Tối", "Cuối tuần", "Full-time">]
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
