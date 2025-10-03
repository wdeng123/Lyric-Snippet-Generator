import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Music, Tag, Layers, Repeat, GitBranch, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import type { RhymeScheme } from '../types';

interface StructuredLyricDisplayProps {
  verse: string[];
  chorus: string[];
  bridge: string[];
  keywords: string[];
  rhymeScheme?: RhymeScheme | null;
  rhymeValidation?: {
    valid: boolean;
    matches: number;
    total: number;
  } | null;
  onRegenerate?: () => void;
}

export const StructuredLyricDisplay = ({
  verse,
  chorus,
  bridge,
  keywords,
  rhymeScheme,
  rhymeValidation,
  onRegenerate
}: StructuredLyricDisplayProps) => {
  if (verse.length === 0 && chorus.length === 0 && bridge.length === 0) {
    return null;
  }

  const getRhymeLabel = (index: number): string => {
    if (!rhymeScheme || rhymeScheme === 'free') return '';

    if (rhymeScheme === 'AABB') {
      // AABB pattern: 0,1 = A, 2,3 = B, 4,5 = C, 6,7 = D
      const pairIndex = Math.floor(index / 2);
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      return labels[pairIndex % labels.length];
    } else if (rhymeScheme === 'ABAB') {
      // ABAB pattern: 0,2 = A, 1,3 = B, 4,6 = C, 5,7 = D
      const groupIndex = Math.floor(index / 4);
      const posInGroup = index % 4;
      const baseLabels = ['A', 'C', 'E', 'G'];
      const altLabels = ['B', 'D', 'F', 'H'];
      return posInGroup % 2 === 0 ? baseLabels[groupIndex] : altLabels[groupIndex];
    }
    return '';
  };

  const SectionHeader = ({
    icon: Icon,
    title,
    color
  }: {
    icon: typeof Layers;
    title: string;
    color: string;
  }) => (
    <div className={`flex items-center gap-2 mb-4 pb-2 border-b ${color}`}>
      <Icon className="w-5 h-5" />
      <h3 className="text-lg font-semibold tracking-wide uppercase">{title}</h3>
    </div>
  );

  const LyricSection = ({
    lines,
    startDelay = 0,
    startIndex = 0
  }: {
    lines: string[];
    startDelay?: number;
    startIndex?: number;
  }) => (
    <div className="space-y-3">
      {lines.map((line, index) => {
        const rhymeLabel = getRhymeLabel(startIndex + index);
        return (
          <div key={index} className="flex items-start gap-3 group">
            {rhymeLabel && (
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-white text-sm font-bold rounded-full shadow-sm group-hover:scale-110 transition-transform">
                {rhymeLabel}
              </span>
            )}
            <p
              className={`flex-1 text-lg md:text-xl text-gray-800 leading-relaxed font-display italic hover:text-primary-700 transition-colors animate-slide-up ${
                !rhymeLabel ? 'ml-0' : ''
              }`}
              style={{
                animationDelay: `${startDelay + index * 80}ms`,
              }}
            >
              {line}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      {/* Structured Lyrics Card */}
      <Card className="relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-indigo-200 rounded-bl-full opacity-40" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200/60">
            <Music className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Your Structured Lyrics
            </h2>
          </div>

          <div className="space-y-8">
            {/* Rhyme Validation Feedback */}
            {rhymeValidation && (
              <div
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  rhymeValidation.valid
                    ? 'bg-green-50 border-green-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                {rhymeValidation.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold ${
                      rhymeValidation.valid ? 'text-green-800' : 'text-amber-800'
                    }`}
                  >
                    {rhymeValidation.valid
                      ? `✓ Rhyme scheme matches! (${rhymeValidation.matches}/${rhymeValidation.total} rhymes)`
                      : `⚠ Some rhymes may not match perfectly (${rhymeValidation.matches}/${rhymeValidation.total} rhymes)`}
                  </p>
                  {!rhymeValidation.valid && onRegenerate && (
                    <Button
                      onClick={onRegenerate}
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Verse Section */}
            {verse.length > 0 && (
              <div>
                <SectionHeader
                  icon={Layers}
                  title="Verse"
                  color="border-blue-300 text-blue-700"
                />
                <LyricSection lines={verse} startDelay={0} startIndex={0} />
              </div>
            )}

            {/* Chorus Section */}
            {chorus.length > 0 && (
              <div>
                <SectionHeader
                  icon={Repeat}
                  title="Chorus"
                  color="border-purple-300 text-purple-700"
                />
                <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 rounded-xl border border-purple-100">
                  <LyricSection lines={chorus} startDelay={verse.length * 80} startIndex={verse.length} />
                </div>
              </div>
            )}

            {/* Bridge Section */}
            {bridge.length > 0 && (
              <div>
                <SectionHeader
                  icon={GitBranch}
                  title="Bridge"
                  color="border-emerald-300 text-emerald-700"
                />
                <LyricSection lines={bridge} startDelay={(verse.length + chorus.length) * 80} startIndex={verse.length + chorus.length} />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Keywords Card */}
      <Card className="bg-gradient-to-br from-primary-50/50 to-indigo-50/50 border-primary-100">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-primary-600" />
          <h3 className="text-base font-semibold text-gray-800">Keywords Used</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={`keyword-${index}-${keyword}`}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all animate-slide-up"
              style={{
                animationDelay: `${(verse.length + chorus.length + bridge.length) * 80 + index * 50}ms`,
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};
