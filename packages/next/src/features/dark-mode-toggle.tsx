'use client';

import type { ReactElement } from 'react';
import Emoji from '../components/emoji.jsx';
import useDarkMode from '../hooks/use-dark-mode.js';
import DarkModeDefaultToggle from './dark-mode-default-toggle.jsx';

export default function DarkModeToggle(): ReactElement {
  const [darkMode, setDarkMode] = useDarkMode();

  if (darkMode === null) {
    return <DarkModeDefaultToggle />;
  }

  if (darkMode) {
    return (
      <button
        onClick={(): void => {
          setDarkMode(false);
        }}
      >
        <Emoji>🌘</Emoji>
      </button>
    );
  }

  return (
    <button
      onClick={(): void => {
        setDarkMode(true);
      }}
    >
      <Emoji>🌖</Emoji>
    </button>
  );
}
