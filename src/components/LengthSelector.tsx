import type { LyricLength } from '../types';
import { AlignLeft } from 'lucide-react';

interface LengthSelectorProps {
  selectedLength: LyricLength;
  onLengthChange: (length: LyricLength) => void;
}

export const LengthSelector = ({ selectedLength, onLengthChange }: LengthSelectorProps) => {
  const lengths: LyricLength[] = [4, 6];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <AlignLeft className="w-5 h-5 text-primary-600" />
        Select Length
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {lengths.map((length) => {
          const isSelected = selectedLength === length;

          return (
            <button
              key={length}
              onClick={() => onLengthChange(length)}
              className={`px-6 py-4 rounded-xl font-semibold transition-all text-base border-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-transparent text-white shadow-lg scale-105'
                  : 'bg-white/60 border-gray-200 text-gray-700 hover:border-primary-300 hover:shadow-md hover:bg-white/80'
              }`}
            >
              {length} Lines
            </button>
          );
        })}
      </div>
    </div>
  );
};
