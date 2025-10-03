export type Theme = 'love' | 'nature' | 'growth' | 'career' | 'friendship' | 'journey';
export type LyricLength = 4 | 6;
export type MusicStyle = 'folk' | 'pop' | 'rap';
export type RhymeScheme = 'AABB' | 'ABAB' | 'free';

export interface Keyword {
  id: number;
  word: string;
}
