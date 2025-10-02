import { useState } from 'react';
import { Dices } from 'lucide-react';
import { Button } from './ui/Button';

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
      <h2 className="text-xl font-semibold text-gray-800">
        Roll Dice ({rollCount}/3)
      </h2>

      <div className="flex items-center gap-4 flex-wrap">
        <Button
          onClick={rollDice}
          disabled={isRolling}
          variant="default"
          size="lg"
          className="group"
        >
          <Dices className={`w-5 h-5 mr-2 transition-transform ${isRolling ? 'animate-spin' : ''}`} />
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>

        {result !== null && (
          <div className={`w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg transition-all bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-400 ${
            isRolling ? 'scale-95' : 'scale-100 animate-slide-up'
          }`}>
            <span className="text-4xl font-bold text-primary-700">{result}</span>
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
                className="w-12 h-12 flex items-center justify-center bg-white/60 border border-gray-300 rounded-xl shadow-sm"
              >
                <span className="text-lg font-semibold text-gray-700">{dice}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
