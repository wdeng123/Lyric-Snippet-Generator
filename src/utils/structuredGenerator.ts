import type { MusicStyle, RhymeScheme } from '../types';
import templateData from '../data/templates.json';
import { applyRhymeScheme } from './rhymeHelper';

/**
 * Fill template string with keyword, handling case variants
 * {keyword} = lowercase, {Keyword} = capitalize first letter
 */
const fillTemplate = (template: string, keyword: string): string => {
  const safeKeyword = keyword || 'dream';

  return template
    .replace(/{keyword}/g, safeKeyword.toLowerCase())
    .replace(/{Keyword}/g, safeKeyword.charAt(0).toUpperCase() + safeKeyword.slice(1).toLowerCase());
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
 * @param rhymeScheme - Rhyme scheme to apply (optional, defaults to 'free')
 * @returns Array of 8 lyric lines
 */
export const generateVerse = async (
  keywords: string[],
  style: MusicStyle,
  rhymeScheme: RhymeScheme = 'free'
): Promise<string[]> => {
  const templates = templateData[style].verse;
  const lines: string[] = [];

  if (keywords.length === 0) {
    return [];
  }

  for (let i = 0; i < 8; i++) {
    const keywordIndex = Math.floor(i / 2) % keywords.length;
    const keyword = keywords[keywordIndex];
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, keyword));
  }

  return await applyRhymeScheme(lines, rhymeScheme);
};

/**
 * Generate chorus lyrics (4 lines) with 1 repeated keyword
 * @param keyword - Single keyword to repeat throughout chorus
 * @param style - Music style (folk/pop/rap)
 * @param rhymeScheme - Rhyme scheme to apply (optional, defaults to 'free')
 * @returns Array of 4 lyric lines
 */
export const generateChorus = async (
  keyword: string,
  style: MusicStyle,
  rhymeScheme: RhymeScheme = 'free'
): Promise<string[]> => {
  const templates = templateData[style].chorus;
  const lines: string[] = [];

  const safeKeyword = keyword || 'dream';

  // Use the same keyword for all chorus lines
  for (let i = 0; i < 4; i++) {
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, safeKeyword));
  }

  return await applyRhymeScheme(lines, rhymeScheme);
};

/**
 * Generate bridge lyrics (4 lines) with new perspective using keywords
 * @param keywords - Array of keywords to use
 * @param style - Music style (folk/pop/rap)
 * @param rhymeScheme - Rhyme scheme to apply (optional, defaults to 'free')
 * @returns Array of 4 lyric lines
 */
export const generateBridge = async (
  keywords: string[],
  style: MusicStyle,
  rhymeScheme: RhymeScheme = 'free'
): Promise<string[]> => {
  const templates = templateData[style].bridge;
  const lines: string[] = [];

  if (keywords.length === 0) {
    return [];
  }

  for (let i = 0; i < 4; i++) {
    const keyword = keywords[i % keywords.length];
    const template = getRandomTemplate(templates);
    lines.push(fillTemplate(template, keyword));
  }

  return await applyRhymeScheme(lines, rhymeScheme);
};

/**
 * Generate complete structured lyrics (verse + chorus + bridge)
 * @param keywords - Array of 5 keywords (4 for verse, 1 for chorus)
 * @param style - Music style
 * @param rhymeScheme - Rhyme scheme to apply (optional, defaults to 'free')
 * @returns Object with verse, chorus, and bridge arrays
 */
export const generateStructuredLyrics = async (
  keywords: string[],
  style: MusicStyle,
  rhymeScheme: RhymeScheme = 'free'
): Promise<{ verse: string[]; chorus: string[]; bridge: string[] }> => {
  // Use first 4 keywords for verse, 5th for chorus
  const verseKeywords = keywords.slice(0, 4);
  const chorusKeyword = keywords[4] || keywords[0];

  return {
    verse: await generateVerse(verseKeywords, style, rhymeScheme),
    chorus: await generateChorus(chorusKeyword, style, rhymeScheme),
    bridge: await generateBridge(verseKeywords, style, rhymeScheme)
  };
};
