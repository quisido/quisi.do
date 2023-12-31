'use client';

import type { ReactElement } from 'react';
import useTheme from '../hooks/use-theme';

export default function Header(): ReactElement {
  const { displayFontFamily, displayFontWeight } = useTheme();

  return (
    <header
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '60em',
        minWidth: 320,
      }}
    >
      <h1
        style={{
          fontFamily: displayFontFamily,
          fontSize: '1.5em',
          fontWeight: displayFontWeight,
          lineHeight: '1.5em',
          marginBottom: '1em',
          marginLeft: 0,
          marginRight: 0,
          marginTop: '0.67em',
          padding: 0,
          textAlign: 'left',
        }}
      >
        quisi.do
      </h1>
    </header>
  );
}
