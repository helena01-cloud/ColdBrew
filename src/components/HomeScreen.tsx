import { Coffee, MessageSquare, Plus } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { motion } from "motion/react";

interface HomeScreenProps {
  onGenerateClick: () => void;
}

export function HomeScreen({ onGenerateClick }: HomeScreenProps) {
  return (
    <div className="space-y-8 pb-24">
      <header className="pt-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Cold<span className="text-blue-600">Brew</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Cold outreach, warm results</p>
        </motion.div>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-4"
      >
        <GlassCard className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none p-8 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-bold leading-tight">
              Ready to brew your next big opportunity?
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-[80%]">
              Generate thoughtful networking and recruiter messages in seconds — then keep track of every connection.
            </p>
            <Button 
              onClick={onGenerateClick}
              variant="secondary" 
              className="mt-4 w-full sm:w-auto"
            >
              <Plus size={20} />
              Generate New Message
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />
        </GlassCard>
      </motion.div>

      <div className="px-4 grid grid-cols-2 gap-4">
        <GlassCard className="flex flex-col items-center text-center gap-3 p-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <MessageSquare size={24} />
          </div>
          <h3 className="font-bold text-slate-800">Recruiter</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Personalized</p>
        </GlassCard>
        
        <GlassCard className="flex flex-col items-center text-center gap-3 p-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
            <Coffee size={24} />
          </div>
          <h3 className="font-bold text-slate-800">Coffee Chat</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Warm Intro</p>
        </GlassCard>
      </div>
      
      <div className="px-4">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Quick Tips</h4>
        <div className="space-y-3">
          {[
            "Be specific about why you're reaching out.",
            "Keep it concise — respect their time.",
            "Always include a clear call to action."
          ].map((tip, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-600 bg-white/40 p-3 rounded-2xl border border-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
