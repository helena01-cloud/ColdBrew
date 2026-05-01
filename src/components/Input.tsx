import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-2xl bg-white/50 border border-slate-200/60 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-400",
          error && "border-red-400 focus:ring-red-500/20 focus:border-red-500/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-600 ml-1">{label}</label>}
      <textarea
        className={cn(
          "w-full px-4 py-3 rounded-2xl bg-white/50 border border-slate-200/60 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-400 min-h-[100px] resize-none",
          error && "border-red-400 focus:ring-red-500/20 focus:border-red-500/50",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}
