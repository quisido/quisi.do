'use client';

import type { PropsWithChildren, ReactElement } from 'react';
import useDarkMode from '../hooks/use-dark-mode.js';
import './html.scss';

export default function Html({ children }: PropsWithChildren): ReactElement {
  // Contexts
  const [darkMode] = useDarkMode();

  const getColorScheme = (): string => {
    if (darkMode === null) {
      return 'default';
    }

    if (darkMode) {
      return 'dark';
    }

    return 'light';
  };

  return (
    <html data-color-scheme={getColorScheme()} lang="en">
      {children}
    </html>
  );
}
