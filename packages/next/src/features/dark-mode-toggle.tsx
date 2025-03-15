'use client';

import { useTranslate, type TranslateFunction } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useDarkMode from '../hooks/use-dark-mode.js';
import DarkModeDefaultToggle from './dark-mode-default-toggle.jsx';
import DarkModeToggleButton from './dark-mode-toggle-button.jsx';

export default function DarkModeToggle(): ReactElement {
  const [darkMode, setDarkMode] = useDarkMode();
  const translate: TranslateFunction = useTranslate();

  if (darkMode === null) {
    return <DarkModeDefaultToggle />;
  }

  if (darkMode) {
    return (
      <DarkModeToggleButton
        label={translate('Use light color scheme') ?? 'Use light color scheme'}
        onClick={(): void => {
          setDarkMode(false);
        }}
      >
        <Emoji>🌘</Emoji>
      </DarkModeToggleButton>
    );
  }

  return (
    <DarkModeToggleButton
      label={translate('Use dark color scheme') ?? 'Use dark color scheme'}
      onClick={(): void => {
        setDarkMode(true);
      }}
    >
      <Emoji>🌖</Emoji>
    </DarkModeToggleButton>
  );
}
