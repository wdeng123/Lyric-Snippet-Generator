import type { Theme, LyricLength } from '../types';
import keywordsData from '../data/keywords.json';

/**
 * Get keyword by dice roll result
 * @param theme - Selected theme
 * @param diceResult - Dice result (1-6)
 * @returns Keyword string
 */
export const getKeywordByDiceRoll = (theme: Theme, diceResult: number): string => {
  const keywords = keywordsData[theme];
  return keywords[diceResult - 1]; // dice 1-6 -> index 0-5
};

/**
 * Generate simple lyrics using keywords
 * @param keywords - Array of keywords to use
 * @param length - Number of lines (4 or 6)
 * @returns Array of lyric lines
 */
export const generateSimpleLyric = (keywords: string[], length: LyricLength): string[] => {
  const templates = [
    (k: string) => `The ${k} leads my way`,
    (k: string) => `${k.charAt(0).toUpperCase() + k.slice(1)} in the night`,
    (k: string) => `I feel the ${k} inside`,
    (k: string) => `When ${k} calls my name`,
    (k: string) => `Through the ${k} I see`,
    (k: string) => `My ${k} never fades`,
  ];

  const lyrics: string[] = [];

  for (let i = 0; i < length; i++) {
    const keyword = keywords[i % keywords.length];
    const template = templates[i % templates.length];
    lyrics.push(template(keyword));
  }

  return lyrics;
};
