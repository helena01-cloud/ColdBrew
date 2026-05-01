import React, { useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { Input, Textarea } from "./Input";
import { OutreachType, CharacterLimit, RecruiterForm, CoffeeChatForm } from "../types";
import { cn } from "../lib/utils";

interface OutreachFormProps {
  type: OutreachType;
  onBack: () => void;
  onGenerate: (data: RecruiterForm | CoffeeChatForm, limit: CharacterLimit) => void;
}

export function OutreachForm({ type, onBack, onGenerate }: OutreachFormProps) {
  const [limit, setLimit] = useState<CharacterLimit>('unlimited');
  const [formData, setFormData] = useState<any>({
    linkedinUrl: '',
    role: '',
    whyFit: '',
    whyReachOut: '',
    chatTopic: '',
    ask: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData, limit);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isRecruiter = type === 'recruiter';

  return (
    <div className="space-y-8 px-4 pt-8 pb-24">
      <header className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">
          {isRecruiter ? "Recruiter Outreach" : "Coffee Chat Request"}
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="LinkedIn Profile URL" 
          placeholder="https://linkedin.com/in/..." 
          value={formData.linkedinUrl}
          onChange={(e) => handleChange('linkedinUrl', e.target.value)}
          required
        />

        {isRecruiter ? (
          <>
            <Input 
              label="Role you're applying for" 
              placeholder="e.g. Software Engineer" 
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              required
            />
            <Textarea 
              label="Why are you a good fit?" 
              placeholder="Mention key skills or experience..." 
              value={formData.whyFit}
              onChange={(e) => handleChange('whyFit', e.target.value)}
              required
            />
            <Input 
              label="What are you asking for?" 
              placeholder="e.g. Quick chat, resume review" 
              value={formData.ask}
              onChange={(e) => handleChange('ask', e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <Textarea 
              label="Why are you reaching out?" 
              placeholder="e.g. I saw your recent post about..." 
              value={formData.whyReachOut}
              onChange={(e) => handleChange('whyReachOut', e.target.value)}
              required
            />
            <Input 
              label="What do you want to chat about?" 
              placeholder="e.g. Your transition from engineering to PM" 
              value={formData.chatTopic}
              onChange={(e) => handleChange('chatTopic', e.target.value)}
              required
            />
            <Input 
              label="What's the specific ask?" 
              placeholder="e.g. 15-minute virtual coffee chat" 
              value={formData.ask}
              onChange={(e) => handleChange('ask', e.target.value)}
              required
            />
          </>
        )}

        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-600 ml-1">Character Limit</label>
          <div className="flex gap-2 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/60">
            {(['200', '300', 'unlimited'] as CharacterLimit[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setLimit(opt)}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-xl transition-all",
                  limit === opt 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {opt === 'unlimited' ? 'Unlimited' : `${opt} chars`}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          <Sparkles size={20} />
          Generate Brew
        </Button>
      </form>
    </div>
  );
}
