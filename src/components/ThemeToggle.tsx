'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'dark' | 'light' | 'cyberpunk' | 'void';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-cyberpunk', 'theme-void');

    // Add new theme class
    root.classList.add(`theme-${newTheme}`);

    // Apply theme-specific CSS variables
    switch (newTheme) {
      case 'light':
        root.style.setProperty('--void-black', '#ffffff');
        root.style.setProperty('--deep-space', '#f5f5f5');
        root.style.setProperty('--obsidian', '#eeeeee');
        root.style.setProperty('--chrome-silver', '#333333');
        root.style.setProperty('--mercury', '#000000');
        root.style.setProperty('--steel', '#666666');
        root.style.setProperty('--graphite', '#999999');
        break;

      case 'cyberpunk':
        root.style.setProperty('--void-black', '#0a0015');
        root.style.setProperty('--deep-space', '#0d001a');
        root.style.setProperty('--obsidian', '#1a0033');
        root.style.setProperty('--chrome-silver', '#ff00ff');
        root.style.setProperty('--mercury', '#00ffff');
        root.style.setProperty('--steel', '#ff0080');
        root.style.setProperty('--graphite', '#8000ff');
        break;

      case 'void':
        root.style.setProperty('--void-black', '#000000');
        root.style.setProperty('--deep-space', '#000000');
        root.style.setProperty('--obsidian', '#050505');
        root.style.setProperty('--chrome-silver', '#666666');
        root.style.setProperty('--mercury', '#888888');
        root.style.setProperty('--steel', '#444444');
        root.style.setProperty('--graphite', '#222222');
        break;

      default: // dark
        root.style.setProperty('--void-black', '#000000');
        root.style.setProperty('--deep-space', '#0a0a0a');
        root.style.setProperty('--obsidian', '#121212');
        root.style.setProperty('--chrome-silver', '#d9d9d9');
        root.style.setProperty('--mercury', '#e8e8e8');
        root.style.setProperty('--steel', '#8b8b8b');
        root.style.setProperty('--graphite', '#4a4a4a');
        break;
    }
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'void'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const themeIcons = {
    dark: '🌙',
    light: '☀️',
    cyberpunk: '🌆',
    void: '⚫',
  };

  const themeLabels = {
    dark: 'Dark',
    light: 'Light',
    cyberpunk: 'Cyberpunk',
    void: 'Void',
  };

  return (
    <button
      onClick={cycleTheme}
      className={styles.toggle}
      aria-label={`Current theme: ${themeLabels[theme]}. Click to change.`}
      title="Toggle theme (T)"
    >
      <span className={styles.icon}>{themeIcons[theme]}</span>
      <span className={styles.label}>{themeLabels[theme]}</span>
    </button>
  );
}
