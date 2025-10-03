import type { Theme } from '../types';
import { Music, Heart, Sprout, Briefcase, Users, Compass } from 'lucide-react';

interface ThemeSelectorProps {
  selectedTheme: Theme | null;
  onThemeChange: (theme: Theme) => void;
}

const themeConfig: Record<Theme, { icon: typeof Heart; emoji: string; color: string }> = {
  love: {
    icon: Heart,
    emoji: '💕',
    color: 'from-pink-500 to-rose-500'
  },
  nature: {
    icon: Sprout,
    emoji: '🌿',
    color: 'from-emerald-500 to-teal-500'
  },
  growth: {
    icon: Music,
    emoji: '🚀',
    color: 'from-primary-500 to-indigo-500'
  },
  career: {
    icon: Briefcase,
    emoji: '💼',
    color: 'from-slate-600 to-gray-700'
  },
  friendship: {
    icon: Users,
    emoji: '🤝',
    color: 'from-amber-500 to-orange-500'
  },
  journey: {
    icon: Compass,
    emoji: '🧭',
    color: 'from-cyan-500 to-blue-600'
  }
};

export const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  const themes: Theme[] = ['love', 'nature', 'growth', 'career', 'friendship', 'journey'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Select Your Theme</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {themes.map((theme) => {
          const config = themeConfig[theme];
          const Icon = config.icon;
          const isSelected = selectedTheme === theme;

          return (
            <label
              key={theme}
              className={`group relative flex flex-col items-center gap-3 p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                isSelected
                  ? `bg-gradient-to-br ${config.color} border-transparent text-white shadow-lg scale-105`
                  : 'bg-white/60 border-gray-200 hover:border-primary-300 hover:shadow-md text-gray-700 hover:bg-white/80'
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={isSelected}
                onChange={() => onThemeChange(theme)}
                className="sr-only"
              />
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  isSelected ? 'text-white' : 'text-primary-600'
                }`} />
                <span className="text-2xl">{config.emoji}</span>
              </div>
              <span className="capitalize font-semibold text-sm tracking-wide">
                {theme}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
