import type { MusicStyle } from '../types';
import { Guitar, Sparkles, Mic } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: MusicStyle | null;
  onStyleChange: (style: MusicStyle) => void;
}

const styleConfig: Record<MusicStyle, { icon: typeof Guitar; emoji: string; color: string; description: string }> = {
  folk: {
    icon: Guitar,
    emoji: '🎸',
    color: 'from-amber-600 to-orange-600',
    description: 'Acoustic & heartfelt'
  },
  pop: {
    icon: Sparkles,
    emoji: '✨',
    color: 'from-fuchsia-500 to-pink-500',
    description: 'Catchy & energetic'
  },
  rap: {
    icon: Mic,
    emoji: '🎤',
    color: 'from-slate-700 to-zinc-800',
    description: 'Bold & rhythmic'
  }
};

export const StyleSelector = ({ selectedStyle, onStyleChange }: StyleSelectorProps) => {
  const styles: MusicStyle[] = ['folk', 'pop', 'rap'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Choose Music Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {styles.map((style) => {
          const config = styleConfig[style];
          const Icon = config.icon;
          const isSelected = selectedStyle === style;

          return (
            <label
              key={style}
              className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                isSelected
                  ? `bg-gradient-to-br ${config.color} border-transparent text-white shadow-lg scale-105`
                  : 'bg-white/60 border-gray-200 hover:border-primary-300 hover:shadow-md text-gray-700 hover:bg-white/80'
              }`}
            >
              <input
                type="radio"
                name="style"
                value={style}
                checked={isSelected}
                onChange={() => onStyleChange(style)}
                className="sr-only"
              />
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-white' : 'text-primary-600'
                }`} />
                <span className="text-2xl">{config.emoji}</span>
              </div>
              <span className="capitalize font-semibold text-sm tracking-wide">
                {style}
              </span>
              <span className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                {config.description}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
