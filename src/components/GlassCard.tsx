import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

export function GlassCard({ children, className, variant = 'light' }: GlassCardProps) {
  return (
    <div className={cn(
      variant === 'light' ? "glass-card" : "glass-dark",
      "rounded-3xl p-6 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
