import { useLyricStore } from './store/useLyricStore';
import { ThemeSelector } from './components/ThemeSelector';
import { DiceRoller } from './components/DiceRoller';
import { LengthSelector } from './components/LengthSelector';
import { LyricDisplay } from './components/LyricDisplay';
import { getKeywordByDiceRoll, generateSimpleLyric } from './utils/lyricGenerator';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary-700 mb-3 tracking-tight">
            Lyric Snippet Generator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            Create beautiful lyrics with the power of randomness
          </p>
        </div>

        {/* Main Card */}
        <Card className="space-y-6 animate-slide-up">
          {/* Step 1: Theme Selection */}
          <div>
            <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />
          </div>

          {/* Divider */}
          {theme && <div className="border-t border-gray-200/60"></div>}

          {/* Step 2: Dice Rolling */}
          {theme && diceResults.length < 3 && (
            <div>
              <DiceRoller
                onRoll={handleDiceRoll}
                rollCount={diceResults.length + 1}
                diceHistory={diceResults}
              />
            </div>
          )}

          {/* Divider */}
          {diceResults.length === 3 && <div className="border-t border-gray-200/60"></div>}

          {/* Step 3: Length Selection */}
          {diceResults.length === 3 && (
            <div>
              <LengthSelector selectedLength={length} onLengthChange={setLength} />
            </div>
          )}

          {/* Divider */}
          {diceResults.length === 3 && keywords.length === 3 && (
            <div className="border-t border-gray-200/60"></div>
          )}

          {/* Step 4: Generate Button */}
          {diceResults.length === 3 && keywords.length === 3 && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleGenerate}
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
              >
                ✨ Generate Lyrics
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                🔄 Start Over
              </Button>
            </div>
          )}
        </Card>

        {/* Step 5: Display Lyrics */}
        <LyricDisplay lyrics={generatedLyrics} keywords={keywords} />
      </div>
    </div>
  );
}

export default App;
