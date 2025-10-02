import { useLyricStore } from './store/useLyricStore';
import { ThemeSelector } from './components/ThemeSelector';
import { DiceRoller } from './components/DiceRoller';
import { LengthSelector } from './components/LengthSelector';
import { LyricDisplay } from './components/LyricDisplay';
import { getKeywordByDiceRoll, generateSimpleLyric } from './utils/lyricGenerator';

function App() {
  const {
    theme,
    length,
    diceResults,
    keywords,
    generatedLyrics,
    setTheme,
    setLength,
    addDiceResult,
    setKeywords,
    setGeneratedLyrics,
    reset,
  } = useLyricStore();

  const handleDiceRoll = (result: number) => {
    addDiceResult(result);

    if (theme && diceResults.length < 3) {
      const keyword = getKeywordByDiceRoll(theme, result);
      setKeywords([...keywords, keyword]);
    }
  };

  const handleGenerate = () => {
    if (keywords.length === 3 && theme) {
      const lyrics = generateSimpleLyric(keywords, length);
      setGeneratedLyrics(lyrics);
    } else {
      alert('Please select a theme and roll dice 3 times first!');
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            ✨ Lyric Snippet Generator
          </h1>
          <p className="text-gray-600 text-lg">Create beautiful lyrics with the power of randomness</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 space-y-8 border border-white/50">
          {/* Step 1: Theme Selection */}
          <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />

          {/* Divider */}
          {theme && <div className="border-t-2 border-gray-200"></div>}

          {/* Step 2: Dice Rolling */}
          {theme && diceResults.length < 3 && (
            <DiceRoller
              onRoll={handleDiceRoll}
              rollCount={diceResults.length + 1}
              diceHistory={diceResults}
            />
          )}

          {/* Divider */}
          {diceResults.length === 3 && <div className="border-t-2 border-gray-200"></div>}

          {/* Step 3: Length Selection */}
          {diceResults.length === 3 && (
            <LengthSelector selectedLength={length} onLengthChange={setLength} />
          )}

          {/* Divider */}
          {diceResults.length === 3 && keywords.length === 3 && (
            <div className="border-t-2 border-gray-200"></div>
          )}

          {/* Step 4: Generate Button */}
          {diceResults.length === 3 && keywords.length === 3 && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGenerate}
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl font-bold text-lg transform hover:scale-105"
              >
                ✨ Generate Lyrics
              </button>
              <button
                onClick={handleReset}
                className="px-10 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl font-bold text-lg transform hover:scale-105"
              >
                🔄 Start Over
              </button>
            </div>
          )}
        </div>

        {/* Step 5: Display Lyrics */}
        <LyricDisplay lyrics={generatedLyrics} keywords={keywords} />
      </div>
    </div>
  );
}

export default App;
