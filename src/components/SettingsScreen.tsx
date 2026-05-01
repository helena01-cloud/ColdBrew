import React, { useState, useEffect } from "react";
import { Key, ExternalLink, ShieldCheck, ShieldAlert, Trash2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Button } from "./Button";
import { Input } from "./Input";
import { storageService } from "../services/storageService";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";

export function SettingsScreen() {
  const [apiKey, setApiKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = storageService.getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setIsSaved(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    storageService.saveApiKey(apiKey.trim());
    setIsSaved(true);
    toast.success("API Key saved locally!");
  };

  const handleDelete = () => {
    storageService.deleteApiKey();
    setApiKey("");
    setIsSaved(false);
    toast.success("API Key removed");
  };

  return (
    <div className="space-y-8 px-4 pt-8 pb-32">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 font-medium">Configure your AI preferences</p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Key size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Gemini API Key</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Personal Access</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              To use ColdBrew, you'll need your own Google Gemini API key. Your key is stored <strong>locally in your browser</strong> and is never sent to our servers.
            </p>

            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-xl"
            >
              Get your API Key from Google AI Studio
              <ExternalLink size={14} />
            </a>
          </div>

          <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-slate-100">
            <div className="relative">
              <Input
                type="password"
                label="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your key here..."
                className="pr-12"
              />
              <div className="absolute right-4 top-[38px]">
                {isSaved ? (
                  <ShieldCheck className="text-green-500" size={20} />
                ) : (
                  <ShieldAlert className="text-amber-500" size={20} />
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isSaved && apiKey === storageService.getApiKey()}>
                {isSaved ? "Update Key" : "Save Key"}
              </Button>
              {isSaved && (
                <Button type="button" variant="ghost" size="icon" onClick={handleDelete} className="bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl">
                  <Trash2 size={20} />
                </Button>
              )}
            </div>
          </form>
        </GlassCard>
      </motion.div>

      <div className="px-2 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Privacy Notice</h4>
        <div className="text-sm text-slate-500 leading-relaxed bg-white/40 p-4 rounded-2xl border border-white/60 space-y-2">
          <p>• Your API key is stored using <code>localStorage</code>.</p>
          <p>• It stays securely on your device.</p>
          <p>• We do not track or store your generated messages on any external database.</p>
        </div>
      </div>
    </div>
  );
}
