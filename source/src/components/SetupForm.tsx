import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AdyenButton } from "./adyen/AdyenButton";

interface SetupFormProps {
  onMatch: (skills: string[], langs: string[], avail: string[], maxMembers: number) => void;
  onStateChange: () => void;
}

export function SetupForm({ onMatch, onStateChange }: SetupFormProps) {
  const [maxMembers, setMaxMembers] = useState(5);
  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  
  const [currentLang, setCurrentLang] = useState("");
  const [langs, setLangs] = useState<string[]>([]);

  const [avail, setAvail] = useState<string[]>([]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
      onStateChange();
    }
  };

  const handleAddLang = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLang.trim() && !langs.includes(currentLang.trim())) {
      setLangs([...langs, currentLang.trim()]);
      setCurrentLang("");
      onStateChange();
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
    onStateChange();
  };

  const removeLang = (langToRemove: string) => {
    setLangs(langs.filter(s => s !== langToRemove));
    onStateChange();
  };

  const toggleAvail = (val: string) => {
    if (avail.includes(val)) {
      setAvail(avail.filter(a => a !== val));
    } else {
      setAvail([...avail, val]);
    }
    onStateChange();
  };

  const handleMaxMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxMembers(Number(e.target.value) || 1);
    onStateChange();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 bg-white/5 p-8 rounded-adyen border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-white text-base">Giới hạn thành viên (Max Members)</Label>
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
          <Label className="text-white text-base">Ràng buộc thời gian (Availability)</Label>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Ca Sáng", "Ca Chiều", "Ca Tối", "Cuối tuần", "Full-time"].map(a => (
              <Badge 
                key={a}
                variant={avail.includes(a) ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1.5 rounded-adyen ${avail.includes(a) ? 'bg-adyen-mint text-adyen-canvas' : 'text-white border-white/30 hover:bg-white/10'}`}
                onClick={() => toggleAvail(a)}
              >
                {a}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-white text-base">Chuyên môn & Domain (Tech Stack, UI/UX...)</Label>
        <form onSubmit={handleAddSkill} className="flex gap-2">
          <Input 
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            placeholder="VD: Python, React, RAG, E-commerce..."
            className="bg-white/10 border-white/20 text-white rounded-adyen h-12 px-4"
          />
          <AdyenButton type="submit" variant="ghost" className="border border-white/20">Thêm</AdyenButton>
        </form>
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map(skill => (
            <Badge key={skill} variant="secondary" className="rounded-adyen bg-white/20 text-white hover:bg-white/30 cursor-pointer px-3 py-1" onClick={() => removeSkill(skill)}>
              {skill} ✕
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-white text-base">Ngoại ngữ (Languages)</Label>
        <form onSubmit={handleAddLang} className="flex gap-2">
          <Input 
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value)}
            placeholder="VD: Tiếng Anh, Tiếng Nhật N2..."
            className="bg-white/10 border-white/20 text-white rounded-adyen h-12 px-4"
          />
          <AdyenButton type="submit" variant="ghost" className="border border-white/20">Thêm</AdyenButton>
        </form>
        <div className="flex flex-wrap gap-2 pt-2">
          {langs.map(l => (
            <Badge key={l} variant="secondary" className="rounded-adyen bg-white/20 text-white hover:bg-white/30 cursor-pointer px-3 py-1" onClick={() => removeLang(l)}>
              {l} ✕
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <AdyenButton className="w-full text-lg h-14" onClick={() => onMatch(skills, langs, avail, maxMembers)}>
          Tạo Đội Hình (Generate Team)
        </AdyenButton>
      </div>
    </div>
  );
}
