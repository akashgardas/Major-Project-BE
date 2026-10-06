import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      id="themeToggleBtn"
      className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-subtle border border-transparent hover:border-border-subtle transition-all"
      aria-label="Toggle theme"
    >
      <span className="material-symbols-outlined text-[20px]">
        {theme === 'dark' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  );
};
