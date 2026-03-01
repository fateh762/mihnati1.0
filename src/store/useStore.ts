import { create } from 'zustand';

export type UserType = 'worker' | 'client' | 'admin' | null;
export type Language = 'ar' | 'en';

interface AppState {
  user: any | null;
  userType: UserType;
  language: Language;
  isLoggedIn: boolean;
  setUser: (user: any) => void;
  setUserType: (type: UserType) => void;
  setLanguage: (lang: Language) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  userType: null,
  language: 'ar',
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setUserType: (type) => set({ userType: type }),
  setLanguage: (lang) => {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    set({ language: lang });
  },
  logout: () => set({ user: null, userType: null, isLoggedIn: false }),
}));