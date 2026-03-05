import { create } from 'zustand';

interface StoreState {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  userType: 'worker' | 'client' | null;
  setUserType: (type: 'worker' | 'client' | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  userType: null,
  setUserType: (type) => set({ userType: type }),
  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));