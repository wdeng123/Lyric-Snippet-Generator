import type { MusicStyle } from '../types';
import templateData from '../data/templates.json';

/**
 * Fill template string with keyword, handling case variants
 * {keyword} = lowercase, {Keyword} = capitalize first letter
 */
const fillTemplate = (template: string, keyword: string): string => {
  return template
    .replace(/{keyword}/g, keyword.toLowerCase())
    .replace(/{Keyword}/g, keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase());
};

/**
 * Get random template from a list
 */
const getRandomTemplate = (templates: string[]): string => {
  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * Generate verse lyrics (8 lines) using 4 keywords distributed across lines
 * @param keywords - Array of 4 keywords to distribute
 * @param style - Music style (folk/pop/rap)
 * @returns Array of 8 lyric lines
 */
export const generateVerse = (keywords: string[], style: MusicStyle): string[] => {
  const templates = templateData[style].verse;
  const lines: string[] = [];

  // Distribute 4 keywords across 8 lines (each keyword used twice)
  for (let i = 0; i < 8; i++) {
    const keywordIndex = Math.floor(i / 2); // 0,0,1,1,2,2,3,3
    const keyword = keywords[keywordIndex];
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, keyword));
  }

  return lines;
};

/**
 * Generate chorus lyrics (4 lines) with 1 repeated keyword
 * @param keyword - Single keyword to repeat throughout chorus
 * @param style - Music style (folk/pop/rap)
 * @returns Array of 4 lyric lines
 */
export const generateChorus = (keyword: string, style: MusicStyle): string[] => {
  const templates = templateData[style].chorus;
  const lines: string[] = [];

  // Use the same keyword for all chorus lines
  for (let i = 0; i < 4; i++) {
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, keyword));
  }

  return lines;
};

/**
 * Generate bridge lyrics (4 lines) with new perspective using keywords
 * @param keywords - Array of keywords to use
 * @param style - Music style (folk/pop/rap)
 * @returns Array of 4 lyric lines
 */
export const generateBridge = (keywords: string[], style: MusicStyle): string[] => {
  const templates = templateData[style].bridge;
  const lines: string[] = [];

  // Use different keywords for variety
  for (let i = 0; i < 4; i++) {
    const keyword = keywords[i % keywords.length];
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, keyword));
  }

  return lines;
};

/**
 * Generate complete structured lyrics (verse + chorus + bridge)
 * @param keywords - Array of 5 keywords (4 for verse, 1 for chorus)
 * @param style - Music style
 * @returns Object with verse, chorus, and bridge arrays
 */
export const generateStructuredLyrics = (
  keywords: string[],
  style: MusicStyle
): { verse: string[]; chorus: string[]; bridge: string[] } => {
  // Use first 4 keywords for verse, 5th for chorus
  const verseKeywords = keywords.slice(0, 4);
  const chorusKeyword = keywords[4] || keywords[0]; // Fallback to first keyword

  return {
    verse: generateVerse(verseKeywords, style),
    chorus: generateChorus(chorusKeyword, style),
    bridge: generateBridge(verseKeywords, style)
  };
};
