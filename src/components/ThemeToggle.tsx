import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'compact' | 'mobile-row' | 'inline';
  className?: string;
}

export default function ThemeToggle({ variant = 'compact', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'mobile-row') {
    return (
      <div
        className={`flex items-center justify-between py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 ${className}`}
      >
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          {isDark ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
          Theme
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          className="px-2.5 py-1 rounded text-xs font-semibold bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs cursor-pointer"
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    );
  }

  return (
    <button
      id="theme-toggle-button"
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
}
