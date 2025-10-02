import { create } from 'zustand';
import type { Theme, LyricLength } from '../types';

interface LyricState {
  theme: Theme | null;
  length: LyricLength;
  diceResults: number[];
  keywords: string[];
  generatedLyrics: string[];

  setTheme: (theme: Theme) => void;
  setLength: (length: LyricLength) => void;
  addDiceResult: (result: number) => void;
  setKeywords: (keywords: string[]) => void;
  setGeneratedLyrics: (lyrics: string[]) => void;
  reset: () => void;
}

export const useLyricStore = create<LyricState>((set) => ({
  theme: null,
  length: 4,
  diceResults: [],
  keywords: [],
  generatedLyrics: [],

  setTheme: (theme) => set({ theme }),
  setLength: (length) => set({ length }),
  addDiceResult: (result) =>
    set((state) => ({ diceResults: [...state.diceResults, result] })),
  setKeywords: (keywords) => set({ keywords }),
  setGeneratedLyrics: (lyrics) => set({ generatedLyrics: lyrics }),
  reset: () =>
    set({
      theme: null,
      length: 4,
      diceResults: [],
      keywords: [],
      generatedLyrics: [],
    }),
}));
