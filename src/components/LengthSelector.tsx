import type { LyricLength } from '../types';

interface LengthSelectorProps {
  selectedLength: LyricLength;
  onLengthChange: (length: LyricLength) => void;
}

export const LengthSelector = ({ selectedLength, onLengthChange }: LengthSelectorProps) => {
  const lengths: LyricLength[] = [4, 6];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Select Length</h2>
      <div className="flex gap-4">
        {lengths.map((length) => (
          <button
            key={length}
            onClick={() => onLengthChange(length)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedLength === length
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {length} lines
          </button>
        ))}
      </div>
    </div>
  );
};
