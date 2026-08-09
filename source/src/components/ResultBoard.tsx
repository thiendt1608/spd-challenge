import { MatchResult } from "@/hooks/useTeamMatching";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export function ResultBoard({ result }: { result: MatchResult }) {
  const teamSize = result.team.length;
  const costSaved = Math.max(0, Math.round(((result.maxMembers - teamSize) / result.maxMembers) * 100));
  const teamPlayers = result.team.filter(c => c.working_style === "Team player").length;
  const cultureScore = Math.min(100, Math.round((teamPlayers / teamSize) * 100) + 20);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-8 space-y-6"
    >
      <div className="p-6 bg-adyen-canvas text-white rounded-adyen shadow-lg relative overflow-hidden">
        {/* Subtle animated background gradient */}
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#00d16a] to-transparent pointer-events-none"
        />
        
        <h3 className="text-2xl font-medium mb-4 relative z-10">Đội hình Đề xuất</h3>
        <div className="bg-white/10 p-4 rounded-adyen border border-white/20 mb-6 relative z-10">
          <p className="text-white/90 text-sm leading-relaxed font-mono">
            <span className="text-[#00d16a] font-bold">[AI LLM Output]:</span> {result.reasoning}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 relative z-10">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Tech & Domain Coverage</span>
              <span className="text-white">100%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 1 }} className="bg-[#00d16a] h-2 rounded-full"></motion.div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Cost Efficiency (Saved)</span>
              <span className="text-white">{costSaved}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${costSaved}%` }} transition={{ delay: 0.7, duration: 1 }} className="bg-blue-400 h-2 rounded-full"></motion.div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Culture Fit Score</span>
              <span className="text-white">{cultureScore}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${cultureScore}%` }} transition={{ delay: 0.9, duration: 1 }} className="bg-yellow-400 h-2 rounded-full"></motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {result.team.map((member) => {
          const assignedRoles = Object.entries(result.roleMapping)
            .filter(([, name]) => name === member.name)
            .map(([cap]) => cap);

          return (
            <motion.div key={member.candidate_id} variants={item}>
              <Card className="p-5 rounded-adyen shadow-sm hover:shadow-md transition-shadow border-2 border-adyen-mint bg-adyen-light h-full">
                <div className="mb-3 border-b border-gray-200 pb-3">
                  <h4 className="font-semibold text-adyen-canvas">{member.name}</h4>
                  <p className="text-xs font-mono text-adyen-ink-muted">{member.preferred_role} • {member.working_style}</p>
                </div>
                
                <p className="text-sm font-medium text-adyen-ink-muted mb-2">Đảm nhận yêu cầu (Vai trò):</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {assignedRoles.length > 0 ? assignedRoles.map(role => (
                    <span key={role} className="bg-adyen-mint text-adyen-canvas text-xs font-medium px-2 py-1 rounded-sm">
                      {role}
                    </span>
                  )) : <span className="text-xs text-gray-500 italic">Hỗ trợ chung dự án</span>}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] mt-auto">
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="block text-gray-400 font-mono mb-1">THỜI GIAN</span>
                    <span className="font-medium text-gray-700">{member.availability.join(", ")}</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200">
                    <span className="block text-gray-400 font-mono mb-1">NGOẠI NGỮ</span>
                    <span className="font-medium text-gray-700">{member.languages.join(", ")}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
