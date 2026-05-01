import { Contact } from "../types";

const STORAGE_KEY = 'coldbrew_contacts';
const API_KEY_STORAGE_KEY = 'coldbrew_api_key';

export const storageService = {
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

  saveContact: (contact: Contact) => {
    const contacts = storageService.getContacts();
    const updated = [contact, ...contacts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteContact: (id: string) => {
    const contacts = storageService.getContacts();
    const updated = contacts.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};
