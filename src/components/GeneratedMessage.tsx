import { Check, Copy, RefreshCw, Save, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

interface GeneratedMessageProps {
  message: string;
  onRetry: () => void;
  onSave: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export function GeneratedMessage({ message, onRetry, onSave, onBack, isGenerating }: GeneratedMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success("Message copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 px-4 pt-8 pb-24">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Your Brew</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="min-h-[200px] flex flex-col justify-between p-8 relative">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Brewing your message...</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">AI Generated</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{message.length} chars</span>
                </div>
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap text-lg">
                  {message}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-xl">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={onRetry} className="rounded-xl">
                    <RefreshCw size={16} />
                    Retry
                  </Button>
                </div>
                <Button variant="primary" size="sm" onClick={onSave} className="rounded-xl">
                  <Save size={16} />
                  Save
                </Button>
              </div>
            </>
          )}
        </GlassCard>
      </motion.div>

      {!isGenerating && (
        <div className="px-2 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Pro Tip</h4>
          <p className="text-sm text-slate-500 leading-relaxed italic">
            "Personalize the first line even more if you can. Mention a specific project or post they shared to show you've done your research."
          </p>
        </div>
      )}
    </div>
  );
}
