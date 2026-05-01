import { Coffee, MessageSquare, ChevronLeft } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { OutreachType } from "../types";
import { motion } from "motion/react";

interface TypeSelectorProps {
  onSelect: (type: OutreachType) => void;
  onBack: () => void;
}

export function TypeSelector({ onSelect, onBack }: TypeSelectorProps) {
  return (
    <div className="space-y-8 px-4 pt-8 pb-24">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Choose Type</h1>
      </header>

      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('recruiter')}
          className="cursor-pointer"
        >
          <GlassCard className="flex items-center gap-6 p-8 hover:border-blue-500/50 transition-all">
            <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <MessageSquare size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Recruiter</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Personalized outreach for a specific job application or hiring manager.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('coffee-chat')}
          className="cursor-pointer"
        >
          <GlassCard className="flex items-center gap-6 p-8 hover:border-indigo-500/50 transition-all">
            <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Coffee size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Coffee Chat</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Networking requests to learn about someone's career or company.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
