import { domToPng } from 'modern-screenshot';
import { saveAs } from 'file-saver';
import type { Theme, MusicStyle, RhymeScheme } from '../types';

export interface LyricMetadata {
  theme: Theme;
  style: MusicStyle;
  rhymeScheme: RhymeScheme;
  diceRolls: number[];
  keywords: string[];
  generatedAt: string;
}

/**
 * Export lyrics as plain text file with metadata
 * @param lyrics - Object with verse, chorus, and bridge arrays
 * @param metadata - Metadata about the generation
 */
export const exportAsText = (
  lyrics: { verse: string[]; chorus: string[]; bridge: string[] },
  metadata: LyricMetadata
): void => {
  const content = `
=== LYRIC SNIPPET ===
Generated: ${metadata.generatedAt}
Theme: ${metadata.theme}
Style: ${metadata.style}
Rhyme Scheme: ${metadata.rhymeScheme}
Dice Rolls: ${metadata.diceRolls.join(', ')}
Keywords: ${metadata.keywords.join(', ')}


[VERSE]
${lyrics.verse.join('\n')}

[CHORUS]
${lyrics.chorus.join('\n')}

[BRIDGE]
${lyrics.bridge.join('\n')}


Generated with Lyric Snippet Generator
  `.trim();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const filename = `lyrics-${Date.now()}.txt`;
  saveAs(blob, filename);
};

/**
 * Export lyrics as PNG image using modern-screenshot
 * @param elementId - ID of the DOM element to capture
 * @param filename - Optional filename (defaults to lyrics-timestamp.png)
 */
export const exportAsImage = async (
  elementId: string,
  filename?: string
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  try {
    await document.fonts.ready;

    const dataUrl = await domToPng(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      features: {
        removeControlCharacter: true,
      },
      style: {
        animation: 'none',
        animationDelay: '0s',
        animationDuration: '0s',
        transition: 'none',
      },
    });

    // Convert data URL to blob and save
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const finalFilename = filename || `lyrics-${Date.now()}.png`;
    saveAs(blob, finalFilename);
  } catch (error) {
    console.error('PNG export error:', error);
    throw new Error(`PNG export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Export lyrics as Markdown file
 * @param lyrics - Object with verse, chorus, and bridge arrays
 * @param metadata - Metadata about the generation
 */
export const exportAsMarkdown = (
  lyrics: { verse: string[]; chorus: string[]; bridge: string[] },
  metadata: LyricMetadata
): void => {
  const content = `# Lyric Snippet

## Metadata

- **Theme**: ${metadata.theme}
- **Style**: ${metadata.style}
- **Rhyme Scheme**: ${metadata.rhymeScheme}
- **Dice Rolls**: ${metadata.diceRolls.join(', ')}
- **Keywords**: ${metadata.keywords.map(k => `\`${k}\``).join(', ')}
- **Generated**: ${metadata.generatedAt}

---

## Verse

${lyrics.verse.map((line, i) => `${i + 1}. ${line}`).join('\n')}

## Chorus

${lyrics.chorus.map((line, i) => `${i + 1}. ${line}`).join('\n')}

## Bridge

${lyrics.bridge.map((line, i) => `${i + 1}. ${line}`).join('\n')}

---

*Generated with Lyric Snippet Generator*
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const filename = `lyrics-${Date.now()}.md`;
  saveAs(blob, filename);
};
