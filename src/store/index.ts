import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'app-storage',
    }
  )
);