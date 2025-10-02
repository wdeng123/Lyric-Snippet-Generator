import { useState } from 'react';

interface DiceRollerProps {
  onRoll: (result: number) => void;
  rollCount: number;
}

export const DiceRoller = ({ onRoll, rollCount }: DiceRollerProps) => {
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
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Roll Dice (Roll {rollCount}/3)</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>

        {result !== null && (
          <div className="w-16 h-16 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg shadow-md">
            <span className="text-3xl font-bold text-gray-800">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
};
