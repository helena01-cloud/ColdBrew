import { Contact } from "../types";

const STORAGE_KEY = 'coldbrew_contacts';
const TRASH_KEY = 'coldbrew_trash';
const API_KEY_STORAGE_KEY = 'coldbrew_api_key';

export const storageService = {
  // ... existing API key methods ...
  getApiKey: (): string | null => {
    return localStorage.getItem(API_KEY_STORAGE_KEY);
  },

  saveApiKey: (key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  },

  deleteApiKey: () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  },

  getContacts: (): Contact[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse contacts from localStorage', e);
      return [];
    }
  },

  getTrash: (): Contact[] => {
    const stored = localStorage.getItem(TRASH_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  },

  saveContact: (contact: Contact) => {
    const contacts = storageService.getContacts();
    const updated = [contact, ...contacts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  moveToTrash: (id: string) => {
    const contacts = storageService.getContacts();
    const contactToDelete = contacts.find(c => c.id === id);
    if (!contactToDelete) return;

    const updatedContacts = contacts.filter(c => c.id !== id);
    const trash = storageService.getTrash();
    const updatedTrash = [contactToDelete, ...trash].slice(0, 50); // Keep last 50

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
  },

  restoreFromTrash: (id: string) => {
    const trash = storageService.getTrash();
    const contactToRestore = trash.find(c => c.id === id);
    if (!contactToRestore) return;

    const updatedTrash = trash.filter(c => c.id !== id);
    const contacts = storageService.getContacts();
    const updatedContacts = [contactToRestore, ...contacts];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedContacts));
    localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
  },

  deletePermanently: (id: string) => {
    const trash = storageService.getTrash();
    const updatedTrash = trash.filter(c => c.id !== id);
    localStorage.setItem(TRASH_KEY, JSON.stringify(updatedTrash));
  }
};
