import { create } from 'zustand';
import type { Theme, LyricLength, MusicStyle, RhymeScheme } from '../types';

interface LyricState {
  theme: Theme | null;
  length: LyricLength;
  style: MusicStyle | null;
  rhymeScheme: RhymeScheme | null;
  diceResults: number[];
  keywords: string[];
  generatedLyrics: string[];

  setTheme: (theme: Theme) => void;
  setLength: (length: LyricLength) => void;
  setStyle: (style: MusicStyle) => void;
  setRhymeScheme: (scheme: RhymeScheme) => void;
  addDiceResult: (result: number) => void;
  setKeywords: (keywords: string[]) => void;
  setGeneratedLyrics: (lyrics: string[]) => void;
  reset: () => void;
}

export const useLyricStore = create<LyricState>((set) => ({
  theme: null,
  length: 4,
  style: null,
  rhymeScheme: null,
  diceResults: [],
  keywords: [],
  generatedLyrics: [],

  setTheme: (theme) => set({ theme }),
  setLength: (length) => set({ length }),
  setStyle: (style) => set({ style }),
  setRhymeScheme: (scheme) => set({ rhymeScheme: scheme }),
  addDiceResult: (result) =>
    set((state) => ({ diceResults: [...state.diceResults, result] })),
  setKeywords: (keywords) => set({ keywords }),
  setGeneratedLyrics: (lyrics) => set({ generatedLyrics: lyrics }),
  reset: () =>
    set({
      theme: null,
      length: 4,
      style: null,
      rhymeScheme: null,
      diceResults: [],
      keywords: [],
      generatedLyrics: [],
    }),
}));
