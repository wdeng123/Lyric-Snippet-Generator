import { useState } from 'react';
import { Plus, X, Edit3 } from 'lucide-react';

interface KeywordCustomizerProps {
  customKeywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
  maxKeywords?: number;
}

export const KeywordCustomizer = ({
  customKeywords,
  onKeywordsChange,
  maxKeywords = 3
}: KeywordCustomizerProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = () => {
    const trimmed = inputValue.trim().toLowerCase();

    if (!trimmed) return;

    if (customKeywords.length >= maxKeywords) {
      return;
    }

    if (customKeywords.includes(trimmed)) {
      return;
    }

    onKeywordsChange([...customKeywords, trimmed]);
    setInputValue('');
  };

  const handleRemoveKeyword = (keyword: string) => {
    onKeywordsChange(customKeywords.filter(k => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const canAddMore = customKeywords.length < maxKeywords;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Edit3 className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Add Custom Keywords (Optional)
        </h2>
      </div>

      {/* Input Section */}
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              canAddMore
                ? `Add your own keyword (${customKeywords.length}/${maxKeywords})`
                : `Maximum ${maxKeywords} keywords reached`
            }
            disabled={!canAddMore}
            className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800"
            maxLength={20}
          />
        </div>
        <button
          onClick={handleAddKeyword}
          disabled={!inputValue.trim() || !canAddMore}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add
        </button>
      </div>

      {/* Keywords Display */}
      {customKeywords.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50/50 to-indigo-50/50 p-4 rounded-xl border border-primary-100">
          <p className="text-sm text-gray-600 mb-3 font-medium">Your Custom Keywords:</p>
          <div className="flex flex-wrap gap-2">
            {customKeywords.map((keyword, index) => (
              <span
                key={`custom-${index}-${keyword}`}
                className="group relative px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 animate-slide-up"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={`Remove ${keyword}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500 italic">
        Custom keywords will be combined with dice-rolled keywords for unique lyrics
      </p>
    </div>
  );
};
