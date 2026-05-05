import React, { useState } from "react";
import { ChevronLeft, Sparkles, Wand2 } from "lucide-react";
import { Button } from "./Button";
import { Input, Textarea } from "./Input";
import { OutreachType, CharacterLimit, RecruiterForm, CoffeeChatForm } from "../types";
import { parsingService } from "../services/parsingService";
import { cn } from "../lib/utils";
import { toast } from "react-hot-toast";

interface OutreachFormProps {
  type: OutreachType;
  onBack: () => void;
  onGenerate: (data: RecruiterForm | CoffeeChatForm, limit: CharacterLimit) => void;
}

export function OutreachForm({ type, onBack, onGenerate }: OutreachFormProps) {
  const [limit, setLimit] = useState<CharacterLimit>('unlimited');
  const [formData, setFormData] = useState<any>({
    linkedinUrl: '',
    contactName: '',
    company: '',
    contactRole: '',
    role: '',
    whyFit: '',
    whyReachOut: '',
    chatTopic: '',
    ask: ''
  });

  const handleParse = () => {
    if (!formData.linkedinUrl) {
      toast.error("Please enter a LinkedIn URL first");
      return;
    }
    const parsed = parsingService.parseLinkedInUrl(formData.linkedinUrl);
    setFormData(prev => ({
      ...prev,
      contactName: parsed.name,
      company: parsed.company,
      contactRole: parsed.role, // Use parsed role as contact's role
      role: prev.role || parsed.role // Fallback for target role if empty
    }));
    toast.success("Details brewed from URL!");
  };

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
        <div className="space-y-4">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input 
                label="LinkedIn Profile URL" 
                placeholder="https://linkedin.com/in/..." 
                value={formData.linkedinUrl}
                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                required
              />
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={handleParse}
              title="Auto-fill details from URL"
              className="h-[50px] w-[50px] rounded-2xl bg-white/50 border-slate-200/60 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Wand2 size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Contact Name" 
              placeholder="e.g. John Doe" 
              value={formData.contactName}
              onChange={(e) => handleChange('contactName', e.target.value)}
              required
            />
            <Input 
              label="Company" 
              placeholder="e.g. Google" 
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              required
            />
          </div>
          <Input 
            label="Their Role" 
            placeholder="e.g. Senior Recruiter" 
            value={formData.contactRole}
            onChange={(e) => handleChange('contactRole', e.target.value)}
            required
          />
        </div>

        <div className="space-y-6 border-t border-slate-100 pt-6">
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
        </div>

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
