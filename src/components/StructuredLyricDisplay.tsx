import { Card } from './ui/Card';
import { Music, Tag, Layers, Repeat, GitBranch } from 'lucide-react';

interface StructuredLyricDisplayProps {
  verse: string[];
  chorus: string[];
  bridge: string[];
  keywords: string[];
}

export const StructuredLyricDisplay = ({
  verse,
  chorus,
  bridge,
  keywords
}: StructuredLyricDisplayProps) => {
  if (verse.length === 0 && chorus.length === 0 && bridge.length === 0) {
    return null;
  }

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
    startDelay = 0
  }: {
    lines: string[];
    startDelay?: number;
  }) => (
    <div className="space-y-3">
      {lines.map((line, index) => (
        <p
          key={index}
          className="text-lg md:text-xl text-gray-800 leading-relaxed font-display italic hover:text-primary-700 transition-colors animate-slide-up"
          style={{
            animationDelay: `${startDelay + index * 80}ms`,
          }}
        >
          {line}
        </p>
      ))}
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
            {/* Verse Section */}
            {verse.length > 0 && (
              <div>
                <SectionHeader
                  icon={Layers}
                  title="Verse"
                  color="border-blue-300 text-blue-700"
                />
                <LyricSection lines={verse} startDelay={0} />
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
                  <LyricSection lines={chorus} startDelay={verse.length * 80} />
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
                <LyricSection lines={bridge} startDelay={(verse.length + chorus.length) * 80} />
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
