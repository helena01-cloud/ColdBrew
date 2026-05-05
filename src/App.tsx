import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence, motion } from "motion/react";

import { BottomNav } from "./components/BottomNav";
import { HomeScreen } from "./components/HomeScreen";
import { TypeSelector } from "./components/TypeSelector";
import { OutreachForm } from "./components/OutreachForm";
import { GeneratedMessage } from "./components/GeneratedMessage";
import { ContactsScreen } from "./components/ContactsScreen";
import { SettingsScreen } from "./components/SettingsScreen";

import { OutreachType, CharacterLimit, Contact, RecruiterForm, CoffeeChatForm } from "./types";
import { aiService } from "./services/aiService";
import { storageService } from "./services/storageService";
import { parsingService } from "./services/parsingService";

type Screen = 'home' | 'type-selector' | 'form' | 'generated' | 'contacts' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'settings'>('home');
  const [screen, setScreen] = useState<Screen>('home');
  const [outreachType, setOutreachType] = useState<OutreachType | null>(null);
  const [formData, setFormData] = useState<RecruiterForm | CoffeeChatForm | null>(null);
  const [characterLimit, setCharacterLimit] = useState<CharacterLimit>('unlimited');
  const [generatedMessage, setGeneratedMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load contacts on mount
  useEffect(() => {
    setContacts(storageService.getContacts());
  }, []);

  const handleTabChange = (tab: 'home' | 'contacts' | 'settings') => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const handleGenerateClick = () => {
    setScreen('type-selector');
  };

  const handleTypeSelect = (type: OutreachType) => {
    setOutreachType(type);
    setScreen('form');
  };

  const handleFormSubmit = async (data: RecruiterForm | CoffeeChatForm, limit: CharacterLimit) => {
    setFormData(data);
    setCharacterLimit(limit);
    setScreen('generated');
    generate(data, limit);
  };

  const generate = async (data: RecruiterForm | CoffeeChatForm, limit: CharacterLimit) => {
    if (!outreachType) return;
    
    setIsGenerating(true);
    try {
      const message = await aiService.generateOutreach({
        type: outreachType,
        limit,
        data
      });
      setGeneratedMessage(message);
    } catch (error: any) {
      if (error.message === 'API_KEY_MISSING') {
        toast.error("API Key missing! Please add it in Settings.");
        setScreen('settings');
        setActiveTab('settings');
      } else {
        toast.error("Failed to brew your message. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    if (formData && characterLimit) {
      generate(formData, characterLimit);
    }
  };

  const handleSave = () => {
    if (!formData || !outreachType || !generatedMessage) return;

    const parsed = parsingService.parseLinkedInUrl(formData.linkedinUrl);
    
    // Prioritize user-entered values from the form over auto-parsed ones
    const f = formData as any;
    const finalName = f.contactName || parsed.name;
    const finalCompany = f.company || parsed.company;
    const finalRole = f.contactRole || parsed.role;

    const newContact: Contact = {
      id: crypto.randomUUID(),
      outreachType,
      linkedinUrl: formData.linkedinUrl,
      parsedName: finalName,
      parsedRole: finalRole,
      parsedCompany: finalCompany,
      generatedMessage,
      createdAt: new Date().toISOString(),
      formMetadata: formData
    };

    storageService.saveContact(newContact);
    setContacts(prev => [newContact, ...prev]);
    toast.success("Contact saved successfully!");
    
    // Reset and go home
    setScreen('home');
    setActiveTab('home');
    setGeneratedMessage("");
    setFormData(null);
    setOutreachType(null);
  };

  const handleDeleteContact = (id: string) => {
    storageService.moveToTrash(id);
    setContacts(storageService.getContacts());
    
    toast((t) => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Contact moved to trash</span>
        <button
          onClick={() => {
            handleRestoreContact(id);
            toast.dismiss(t.id);
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2 py-1 rounded-lg"
        >
          Undo
        </button>
      </div>
    ), { duration: 5000 });
  };

  const handleRestoreContact = (id: string) => {
    storageService.restoreFromTrash(id);
    setContacts(storageService.getContacts());
    toast.success("Contact restored!");
  };

  const handlePermanentDelete = (id: string) => {
    storageService.deletePermanently(id);
    // No need to update main contacts state as it's only in trash
    toast.success("Deleted permanently");
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen onGenerateClick={handleGenerateClick} />;
      case 'type-selector':
        return <TypeSelector onSelect={handleTypeSelect} onBack={() => setScreen('home')} />;
      case 'form':
        return outreachType ? (
          <OutreachForm 
            type={outreachType} 
            onBack={() => setScreen('type-selector')} 
            onGenerate={handleFormSubmit} 
          />
        ) : null;
      case 'generated':
        return (
          <GeneratedMessage 
            message={generatedMessage} 
            isGenerating={isGenerating}
            onRetry={handleRetry}
            onSave={handleSave}
            onBack={() => setScreen('form')}
          />
        );
      case 'contacts':
        return (
          <ContactsScreen 
            contacts={contacts} 
            onDelete={handleDeleteContact} 
            onRestore={handleRestoreContact}
            onPermanentDelete={handlePermanentDelete}
          />
        );
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen onGenerateClick={handleGenerateClick} />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen relative">
      <Toaster position="top-center" />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Background decorative blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
