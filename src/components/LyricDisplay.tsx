import { Card } from './ui/Card';
import { Music, Tag } from 'lucide-react';

interface LyricDisplayProps {
  lyrics: string[];
  keywords: string[];
}

export const LyricDisplay = ({ lyrics, keywords }: LyricDisplayProps) => {
  if (lyrics.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      {/* Lyrics Card with professional typography */}
      <Card className="relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-bl-full opacity-50" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200/60">
            <Music className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Your Lyric Snippet
            </h2>
          </div>

          <div className="space-y-4">
            {lyrics.map((line, index) => (
              <p
                key={index}
                className="text-xl md:text-2xl text-gray-800 leading-relaxed font-display italic animate-slide-up hover:text-primary-700 transition-colors"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {line}
              </p>
            ))}
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
                animationDelay: `${index * 50}ms`,
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
