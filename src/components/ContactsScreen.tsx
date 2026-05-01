import { Search, ExternalLink, Calendar, MessageSquare, Coffee, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Contact } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface ContactsScreenProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

export function ContactsScreen({ contacts, onDelete }: ContactsScreenProps) {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(c => 
    c.parsedName.toLowerCase().includes(search.toLowerCase()) ||
    c.parsedCompany.toLowerCase().includes(search.toLowerCase()) ||
    c.parsedRole.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 px-4 pt-8 pb-24">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, company, or role..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/50 border border-slate-200/60 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <motion.div
                key={contact.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-5 space-y-4 group">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                        contact.outreachType === 'recruiter' ? "bg-blue-100 text-blue-600" : "bg-indigo-100 text-indigo-600"
                      )}>
                        {contact.outreachType === 'recruiter' ? <MessageSquare size={24} /> : <Coffee size={24} />}
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-slate-900">{contact.parsedName}</h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {contact.parsedRole} @ {contact.parsedCompany}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <a 
                        href={contact.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <button 
                        onClick={() => onDelete(contact.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-xl p-3 text-sm text-slate-600 line-clamp-3 leading-relaxed italic border border-slate-100">
                    "{contact.generatedMessage}"
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Calendar size={12} />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
                      contact.outreachType === 'recruiter' ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                    )}>
                      {contact.outreachType === 'recruiter' ? "Recruiter" : "Coffee Chat"}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Users size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">No contacts found</h3>
                <p className="text-sm text-slate-500">
                  {search ? "Try a different search term" : "Start brewing messages to save contacts here"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
