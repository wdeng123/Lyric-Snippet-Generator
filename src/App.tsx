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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Lyric Snippet Generator
        </h1>

        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          {/* Step 1: Theme Selection */}
          <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />

          {/* Step 2: Dice Rolling */}
          {theme && diceResults.length < 3 && (
            <DiceRoller onRoll={handleDiceRoll} rollCount={diceResults.length + 1} />
          )}

          {/* Step 3: Length Selection */}
          {diceResults.length === 3 && (
            <LengthSelector selectedLength={length} onLengthChange={setLength} />
          )}

          {/* Step 4: Generate Button */}
          {diceResults.length === 3 && keywords.length === 3 && (
            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Generate Lyrics
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Start Over
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
