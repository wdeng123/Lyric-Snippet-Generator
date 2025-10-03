import { useState } from 'react';
import { useLyricStore } from './store/useLyricStore';
import { ThemeSelector } from './components/ThemeSelector';
import { DiceRoller } from './components/DiceRoller';
import { LengthSelector } from './components/LengthSelector';
import { StyleSelector } from './components/StyleSelector';
import { RhymeSchemeSelector } from './components/RhymeSchemeSelector';
import { KeywordCustomizer } from './components/KeywordCustomizer';
import { LyricDisplay } from './components/LyricDisplay';
import { StructuredLyricDisplay } from './components/StructuredLyricDisplay';
import { getKeywordByDiceRoll, generateSimpleLyric } from './utils/lyricGenerator';
import { generateStructuredLyrics } from './utils/structuredGenerator';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

function App() {
  const {
    theme,
    length,
    style,
    rhymeScheme,
    diceResults,
    keywords,
    generatedLyrics,
    setTheme,
    setLength,
    setStyle,
    setRhymeScheme,
    addDiceResult,
    setKeywords,
    setGeneratedLyrics,
    reset,
  } = useLyricStore();

  // Local state for custom keywords and structured lyrics
  const [customKeywords, setCustomKeywords] = useState<string[]>([]);
  const [structuredLyrics, setStructuredLyrics] = useState<{
    verse: string[];
    chorus: string[];
    bridge: string[];
  } | null>(null);

  // Phase 2: Always use structured mode
  const useStructuredMode = true;

  const handleDiceRoll = (result: number) => {
    addDiceResult(result);

    if (theme) {
      const maxRolls = useStructuredMode ? 5 : 3;
      if (diceResults.length < maxRolls) {
        const keyword = getKeywordByDiceRoll(theme, result);
        setKeywords([...keywords, keyword]);
      }
    }
  };

  const handleGenerate = () => {
    // Combine dice keywords with custom keywords
    const allKeywords = [...keywords, ...customKeywords];

    if (useStructuredMode) {
      // Structured mode requires 5 keywords (or at least 1)
      if (allKeywords.length >= 1 && style) {
        const lyrics = generateStructuredLyrics(allKeywords, style);
        setStructuredLyrics(lyrics);
      } else {
        alert('Please select a theme, music style, and roll dice at least once!');
      }
    } else {
      // Simple mode requires 3 keywords
      if (allKeywords.length >= 3 && theme) {
        const lyrics = generateSimpleLyric(allKeywords.slice(0, 3), length);
        setGeneratedLyrics(lyrics);
      } else {
        alert('Please select a theme and roll dice 3 times first!');
      }
    }
  };

  const handleReset = () => {
    reset();
    setCustomKeywords([]);
    setStructuredLyrics(null);
  };

  const maxRolls = useStructuredMode ? 5 : 3;
  const requiredKeywords = useStructuredMode ? 5 : 3;

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

          {/* Step 2: Style Selection (Structured Mode) */}
          {useStructuredMode && theme && (
            <>
              <div>
                <StyleSelector selectedStyle={style} onStyleChange={setStyle} />
              </div>
              <div className="border-t border-gray-200/60"></div>
            </>
          )}

          {/* Step 3: Rhyme Scheme Selection (Structured Mode) */}
          {useStructuredMode && theme && style && (
            <>
              <div>
                <RhymeSchemeSelector
                  selectedScheme={rhymeScheme}
                  onSchemeChange={setRhymeScheme}
                />
              </div>
              <div className="border-t border-gray-200/60"></div>
            </>
          )}

          {/* Step 4: Dice Rolling */}
          {theme && (!useStructuredMode || (style && rhymeScheme)) && diceResults.length < maxRolls && (
            <div>
              <DiceRoller
                onRoll={handleDiceRoll}
                rollCount={diceResults.length + 1}
                maxRolls={maxRolls}
                diceHistory={diceResults}
              />
            </div>
          )}

          {/* Divider */}
          {diceResults.length >= requiredKeywords && <div className="border-t border-gray-200/60"></div>}

          {/* Step 5: Custom Keywords */}
          {useStructuredMode && diceResults.length >= requiredKeywords && (
            <>
              <div>
                <KeywordCustomizer
                  customKeywords={customKeywords}
                  onKeywordsChange={setCustomKeywords}
                />
              </div>
              <div className="border-t border-gray-200/60"></div>
            </>
          )}

          {/* Step 6: Length Selection (Simple Mode Only) */}
          {!useStructuredMode && diceResults.length === 3 && (
            <>
              <div>
                <LengthSelector selectedLength={length} onLengthChange={setLength} />
              </div>
              <div className="border-t border-gray-200/60"></div>
            </>
          )}

          {/* Step 7: Generate Button */}
          {((useStructuredMode && diceResults.length >= 1 && style) ||
            (!useStructuredMode && diceResults.length === 3)) && (
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

        {/* Step 8: Display Lyrics */}
        {useStructuredMode && structuredLyrics ? (
          <StructuredLyricDisplay
            verse={structuredLyrics.verse}
            chorus={structuredLyrics.chorus}
            bridge={structuredLyrics.bridge}
            keywords={[...keywords, ...customKeywords]}
          />
        ) : (
          <LyricDisplay lyrics={generatedLyrics} keywords={keywords} />
        )}
      </div>
    </div>
  );
}

export default App;
