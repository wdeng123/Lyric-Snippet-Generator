import { RiTa } from 'rita';
import type { RhymeScheme } from '../types';

/**
 * Get rhyming words for a given word using RiTa's rhyme dictionary
 * @param word - The word to find rhymes for
 * @returns Array of rhyming words
 */
export const getRhymes = async (word: string): Promise<string[]> => {
  if (!word) return [];
  return await RiTa.rhymes(word.toLowerCase());
};

/**
 * Check if two words rhyme
 * @param word1 - First word
 * @param word2 - Second word
 * @returns True if the words rhyme
 */
export const checkRhyme = async (word1: string, word2: string): Promise<boolean> => {
  if (!word1 || !word2) return false;
  const rhymes = await getRhymes(word1);
  return rhymes.includes(word2.toLowerCase());
};

/**
 * Extract the last word from a line of text
 * @param line - The line of text
 * @returns The last word, or empty string if none
 */
export const getLastWord = (line: string): string => {
  const cleaned = line.replace(/[.,!?;:]$/, '').trim();
  const words = cleaned.split(/\s+/);
  return words[words.length - 1] || '';
};

/**
 * Replace the last word in a line with a new word
 * @param line - The line of text
 * @param newWord - The word to replace with
 * @returns The modified line
 */
export const replaceLastWord = (line: string, newWord: string): string => {
  const punctuation = line.match(/[.,!?;:]$/)?.[0] || '';
  const withoutPunctuation = line.replace(/[.,!?;:]$/, '').trim();
  const words = withoutPunctuation.split(/\s+/);

  if (words.length === 0) return newWord + punctuation;

  words[words.length - 1] = newWord;
  return words.join(' ') + punctuation;
};

/**
 * Apply AABB rhyme scheme to an array of lines
 * Lines 0-1 rhyme, 2-3 rhyme, 4-5 rhyme, 6-7 rhyme
 * @param lines - Array of lyric lines
 * @returns Modified lines with AABB rhyme scheme applied
 */
export const applyAABB = async (lines: string[]): Promise<string[]> => {
  const result = [...lines];

  for (let i = 0; i < result.length - 1; i += 2) {
    const word1 = getLastWord(result[i]);
    if (!word1) continue;

    const rhymes = await getRhymes(word1);
    if (rhymes.length > 0) {
      // Pick a random rhyme that's different from the original word
      const suitableRhymes = rhymes.filter(r => r !== word1.toLowerCase());
      if (suitableRhymes.length > 0) {
        const randomRhyme = suitableRhymes[Math.floor(Math.random() * suitableRhymes.length)];
        result[i + 1] = replaceLastWord(result[i + 1], randomRhyme);
      }
    }
  }

  return result;
};

/**
 * Apply ABAB rhyme scheme to an array of lines
 * Lines 0-2 rhyme, 1-3 rhyme, 4-6 rhyme, 5-7 rhyme
 * @param lines - Array of lyric lines
 * @returns Modified lines with ABAB rhyme scheme applied
 */
export const applyABAB = async (lines: string[]): Promise<string[]> => {
  const result = [...lines];

  // Process in groups of 4 lines
  for (let i = 0; i < result.length - 3; i += 4) {
    // Make lines i and i+2 rhyme (A rhyme)
    const wordA = getLastWord(result[i]);
    if (wordA) {
      const rhymesA = await getRhymes(wordA);
      const suitableRhymesA = rhymesA.filter(r => r !== wordA.toLowerCase());
      if (suitableRhymesA.length > 0) {
        const randomRhymeA = suitableRhymesA[Math.floor(Math.random() * suitableRhymesA.length)];
        result[i + 2] = replaceLastWord(result[i + 2], randomRhymeA);
      }
    }

    // Make lines i+1 and i+3 rhyme (B rhyme)
    const wordB = getLastWord(result[i + 1]);
    if (wordB) {
      const rhymesB = await getRhymes(wordB);
      const suitableRhymesB = rhymesB.filter(r => r !== wordB.toLowerCase());
      if (suitableRhymesB.length > 0) {
        const randomRhymeB = suitableRhymesB[Math.floor(Math.random() * suitableRhymesB.length)];
        result[i + 3] = replaceLastWord(result[i + 3], randomRhymeB);
      }
    }
  }

  return result;
};

/**
 * Apply the specified rhyme scheme to lyrics
 * @param lines - Array of lyric lines
 * @param scheme - The rhyme scheme to apply
 * @returns Modified lines with rhyme scheme applied
 */
export const applyRhymeScheme = async (lines: string[], scheme: RhymeScheme): Promise<string[]> => {
  if (scheme === 'free') return lines;
  if (scheme === 'AABB') return await applyAABB(lines);
  if (scheme === 'ABAB') return await applyABAB(lines);
  return lines;
};

/**
 * Validate if lyrics follow the specified rhyme scheme
 * @param lines - Array of lyric lines
 * @param scheme - The rhyme scheme to validate against
 * @returns Object with validation result and details
 */
export const validateRhymeScheme = async (
  lines: string[],
  scheme: RhymeScheme
): Promise<{ valid: boolean; matches: number; total: number }> => {
  if (scheme === 'free') return { valid: true, matches: 0, total: 0 };

  let matches = 0;
  let total = 0;

  if (scheme === 'AABB') {
    for (let i = 0; i < lines.length - 1; i += 2) {
      total++;
      const word1 = getLastWord(lines[i]);
      const word2 = getLastWord(lines[i + 1]);
      if (await checkRhyme(word1, word2)) {
        matches++;
      }
    }
  } else if (scheme === 'ABAB') {
    for (let i = 0; i < lines.length - 3; i += 4) {
      total += 2;
      const word1 = getLastWord(lines[i]);
      const word3 = getLastWord(lines[i + 2]);
      const word2 = getLastWord(lines[i + 1]);
      const word4 = getLastWord(lines[i + 3]);

      if (await checkRhyme(word1, word3)) matches++;
      if (await checkRhyme(word2, word4)) matches++;
    }
  }

  const valid = total > 0 ? matches / total >= 0.8 : true; // 80% threshold
  return { valid, matches, total };
};
