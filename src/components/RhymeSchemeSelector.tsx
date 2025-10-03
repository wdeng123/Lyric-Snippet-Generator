import type { RhymeScheme } from '../types';
import { Layers, Shuffle, Wind } from 'lucide-react';

interface RhymeSchemeSelectorProps {
  selectedScheme: RhymeScheme | null;
  onSchemeChange: (scheme: RhymeScheme) => void;
}

const schemeConfig: Record<RhymeScheme, { icon: typeof Layers; emoji: string; color: string; description: string; pattern: string }> = {
  AABB: {
    icon: Layers,
    emoji: '📝',
    color: 'from-blue-500 to-cyan-500',
    description: 'Couplet rhyme',
    pattern: 'Lines 1-2, 3-4 rhyme'
  },
  ABAB: {
    icon: Shuffle,
    emoji: '🔀',
    color: 'from-purple-500 to-violet-500',
    description: 'Alternating rhyme',
    pattern: 'Lines 1-3, 2-4 rhyme'
  },
  free: {
    icon: Wind,
    emoji: '🌊',
    color: 'from-teal-500 to-emerald-500',
    description: 'Freeform',
    pattern: 'No rhyme structure'
  }
};

export const RhymeSchemeSelector = ({ selectedScheme, onSchemeChange }: RhymeSchemeSelectorProps) => {
  const schemes: RhymeScheme[] = ['AABB', 'ABAB', 'free'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Select Rhyme Scheme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {schemes.map((scheme) => {
          const config = schemeConfig[scheme];
          const Icon = config.icon;
          const isSelected = selectedScheme === scheme;

          return (
            <label
              key={scheme}
              className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                isSelected
                  ? `bg-gradient-to-br ${config.color} border-transparent text-white shadow-lg scale-105`
                  : 'bg-white/60 border-gray-200 hover:border-primary-300 hover:shadow-md text-gray-700 hover:bg-white/80'
              }`}
            >
              <input
                type="radio"
                name="scheme"
                value={scheme}
                checked={isSelected}
                onChange={() => onSchemeChange(scheme)}
                className="sr-only"
              />
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-white' : 'text-primary-600'
                }`} />
                <span className="text-2xl">{config.emoji}</span>
              </div>
              <span className="font-bold text-lg tracking-wide">
                {scheme}
              </span>
              <div className="text-center">
                <span className={`text-xs font-medium block ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                  {config.description}
                </span>
                <span className={`text-xs block mt-1 ${isSelected ? 'text-white/75' : 'text-gray-500'}`}>
                  {config.pattern}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
