'use client';

import type { ReactElement } from 'react';
import useTheme from '../hooks/use-theme.js';

export default function Header(): ReactElement {
  const { displayFontFamily, displayFontWeight } = useTheme();

  return (
    <header
      style={{
        marginBottom: '1em',
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
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: '0.67em',
          padding: 0,
          textAlign: 'left',
        }}
      >
        quisi.do
      </h1>
      <span
        style={{
          display: 'block',
          fontSize: '0.75em',
          marginTop: '-0.5em',
          paddingLeft: '1.5em',
        }}
      >
        charitable <abbr title="Software as a service">SaaS</abbr>
      </span>
    </header>
  );
}
