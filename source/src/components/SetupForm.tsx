import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AdyenButton } from "./adyen/AdyenButton";

interface SetupFormProps {
  onMatch: (skills: string[], maxMembers: number) => void;
  onStateChange: () => void;
}

export function SetupForm({ onMatch, onStateChange }: SetupFormProps) {
  const [maxMembers, setMaxMembers] = useState(5);
  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
      onStateChange();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
    onStateChange();
  };

  const handleMaxMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMembers(Number(e.target.value) || 1);
    onStateChange();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8">
      <div className="space-y-4">
        <Label className="text-white text-lg">Giới hạn thành viên (Max Members)</Label>
        <Input 
          type="number" 
          value={maxMembers} 
          onChange={handleMaxMembersChange}
          min={1}
          max={20}
          className="bg-white/10 border-white/20 text-white rounded-adyen h-12 px-4"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-white text-lg">Kỹ năng yêu cầu (Required Skills)</Label>
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <Input 
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="Nhập kỹ năng (VD: Frontend)..."
            className="bg-white/10 border-white/20 text-white rounded-adyen h-12 px-4"
          />
          <AdyenButton type="submit" variant="ghost" className="border border-white/20">Thêm</AdyenButton>
        </form>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map(skill => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="rounded-adyen bg-white/20 text-white hover:bg-white/30 cursor-pointer text-sm px-3 py-1"
              onClick={() => removeSkill(skill)}
            >
              {skill} ✕
            </Badge>
          ))}
          {skills.length === 0 && <span className="text-white/50 text-sm">Chưa có kỹ năng nào.</span>}
        </div>
      </div>

      <div className="pt-4">
        <AdyenButton 
          className="w-full" 
          onClick={() => onMatch(skills, maxMembers)}
        >
          Tạo Đội Hình (Generate Team)
        </AdyenButton>
      </div>
    </div>
  );
}