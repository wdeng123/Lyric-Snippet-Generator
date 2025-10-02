import type { Theme } from '../types';

interface ThemeSelectorProps {
  selectedTheme: Theme | null;
  onThemeChange: (theme: Theme) => void;
}

const themeIcons: Record<Theme, string> = {
  love: '💕',
  nature: '🌿',
  growth: '🚀'
};

export const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  const themes: Theme[] = ['love', 'nature', 'growth'];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">🎨 Select Theme</h2>
      <div className="grid grid-cols-3 gap-4">
        {themes.map((theme) => (
          <label
            key={theme}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all ${
              selectedTheme === theme
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl scale-105'
                : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg text-gray-700'
            }`}
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => onThemeChange(theme)}
              className="sr-only"
            />
            <span className="text-3xl">{themeIcons[theme]}</span>
            <span className="capitalize font-semibold">{theme}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
