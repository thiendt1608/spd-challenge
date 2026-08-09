import { useState } from "react";
import { Label } from "@/components/ui/label";
import { AdyenButton } from "./adyen/AdyenButton";

interface SetupFormProps {
  onMatch: (promptText: string) => void;
  onStateChange: () => void;
}

export function SetupForm({ onMatch, onStateChange }: SetupFormProps) {
  const [promptText, setPromptText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
    onStateChange();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 bg-white/5 p-8 rounded-adyen border border-white/10">
      <div className="space-y-4 text-left">
        <Label className="text-white text-lg font-medium">Text-to-Team: Mô tả chi tiết đội hình bạn muốn tìm</Label>
        <textarea 
          value={promptText}
          onChange={handleChange}
          placeholder="VD: T cần 1 team tối đa 3 người, rảnh rỗi vào Ca Sáng, chuyên môn là Python và giỏi Tiếng Anh..."
          className="w-full min-h-[150px] bg-white/10 border border-white/20 text-white rounded-adyen p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#00d16a] focus:border-transparent placeholder:text-white/40"
        />
        <p className="text-white/50 text-xs font-mono">
          AI sẽ tự động bóc tách (parse) giới hạn thành viên, thời gian làm việc, và kỹ năng từ câu lệnh của bạn.
        </p>
      </div>

      <div className="pt-2">
        <AdyenButton className="w-full text-lg h-14 bg-[#00d16a] text-[#001222] hover:bg-[#00b05a]" onClick={() => onMatch(promptText)}>
          Phân Tích Ngôn Ngữ & Ghép Đội (AI)
        </AdyenButton>
      </div>
    </div>
  );
}
