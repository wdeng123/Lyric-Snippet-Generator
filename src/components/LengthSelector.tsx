import type { LyricLength } from '../types';

interface LengthSelectorProps {
  selectedLength: LyricLength;
  onLengthChange: (length: LyricLength) => void;
}

export const LengthSelector = ({ selectedLength, onLengthChange }: LengthSelectorProps) => {
  const lengths: LyricLength[] = [4, 6];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">📝 Select Length</h2>
      <div className="grid grid-cols-2 gap-4">
        {lengths.map((length) => (
          <button
            key={length}
            onClick={() => onLengthChange(length)}
            className={`px-8 py-4 rounded-xl font-bold transition-all text-lg ${
              selectedLength === length
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl scale-105'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:shadow-lg'
            }`}
          >
            {length} lines
          </button>
        ))}
      </div>
    </div>
  );
};
