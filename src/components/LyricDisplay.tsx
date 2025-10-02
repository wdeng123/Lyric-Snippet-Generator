interface LyricDisplayProps {
  lyrics: string[];
  keywords: string[];
}

export const LyricDisplay = ({ lyrics, keywords }: LyricDisplayProps) => {
  if (lyrics.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Lyrics Card with enhanced design */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
          Your Lyric Snippet ✨
        </h2>
        <div className="space-y-3">
          {lyrics.map((line, index) => (
            <p key={index} className="text-xl text-gray-800 leading-relaxed font-medium italic">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Keywords Card with better spacing */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="text-base font-bold text-gray-700 mb-3">🎵 Keywords Used:</h3>
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <span
              key={`keyword-${index}-${keyword}`}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
