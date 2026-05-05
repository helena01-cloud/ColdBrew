import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95",
    secondary: "bg-white/80 text-slate-900 hover:bg-white active:scale-95",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100/50 active:scale-95",
    outline: "bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
    icon: "p-2"
  };

  return (
    <button 
      className={cn(
        "rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
