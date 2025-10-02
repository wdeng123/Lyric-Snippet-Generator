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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Lyric Snippet</h2>
        <div className="space-y-2">
          {lyrics.map((line, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Keywords Used:</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
