import type { Theme } from '../types';

interface ThemeSelectorProps {
  selectedTheme: Theme | null;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector = ({ selectedTheme, onThemeChange }: ThemeSelectorProps) => {
  const themes: Theme[] = ['love', 'nature', 'growth'];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-800">Select Theme</h2>
      <div className="flex gap-4">
        {themes.map((theme) => (
          <label
            key={theme}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={selectedTheme === theme}
              onChange={() => onThemeChange(theme)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="capitalize text-gray-700">{theme}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
