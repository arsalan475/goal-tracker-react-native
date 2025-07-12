// stores/useSessionStore.ts
import { create } from 'zustand';

type SessionState = {
  hasShownQuote: boolean;
  setHasShownQuote: (value: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  hasShownQuote: false,
  setHasShownQuote: (value) => set({ hasShownQuote: value }),
}));
