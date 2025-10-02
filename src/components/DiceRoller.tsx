import { useState } from 'react';

interface DiceRollerProps {
  onRoll: (result: number) => void;
  rollCount: number;
  diceHistory?: number[];
}

export const DiceRoller = ({ onRoll, rollCount, diceHistory = [] }: DiceRollerProps) => {
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);

    // Simulate rolling animation
    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count >= 10) {
        clearInterval(interval);
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setResult(finalResult);
        setIsRolling(false);
        onRoll(finalResult);
      }
    }, 100);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">🎲 Roll Dice (Roll {rollCount}/3)</h2>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all shadow-lg hover:shadow-xl font-semibold"
        >
          {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
        </button>

        {result !== null && (
          <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-white to-gray-100 border-4 border-blue-500 rounded-2xl shadow-xl animate-bounce">
            <span className="text-4xl font-bold text-blue-600">{result}</span>
          </div>
        )}
      </div>

      {/* Dice History */}
      {diceHistory.length > 0 && (
        <div className="flex items-center gap-3 pt-2">
          <span className="text-sm font-medium text-gray-600">History:</span>
          <div className="flex gap-2">
            {diceHistory.map((dice, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              >
                <span className="text-lg font-bold text-gray-700">{dice}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
