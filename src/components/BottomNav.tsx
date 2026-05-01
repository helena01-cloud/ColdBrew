import { Home, Users, Settings } from "lucide-react";
import { cn } from "../lib/utils";

interface BottomNavProps {
  activeTab: 'home' | 'contacts' | 'settings';
  onTabChange: (tab: 'home' | 'contacts' | 'settings') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md glass rounded-3xl p-1.5 flex items-center justify-around z-50 shadow-2xl">
      <button
        onClick={() => onTabChange('home')}
        className={cn(
          "flex flex-col items-center gap-1 py-2 px-5 rounded-2xl transition-all duration-300",
          activeTab === 'home' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-100/50"
        )}
      >
        <Home size={18} />
        <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
      </button>
      
      <button
        onClick={() => onTabChange('contacts')}
        className={cn(
          "flex flex-col items-center gap-1 py-2 px-5 rounded-2xl transition-all duration-300",
          activeTab === 'contacts' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-100/50"
        )}
      >
        <Users size={18} />
        <span className="text-[9px] font-bold uppercase tracking-wider">Contacts</span>
      </button>

      <button
        onClick={() => onTabChange('settings')}
        className={cn(
          "flex flex-col items-center gap-1 py-2 px-5 rounded-2xl transition-all duration-300",
          activeTab === 'settings' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-100/50"
        )}
      >
        <Settings size={18} />
        <span className="text-[9px] font-bold uppercase tracking-wider">Settings</span>
      </button>
    </nav>
  );
}
