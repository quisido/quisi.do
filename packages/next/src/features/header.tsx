'use client';

import { memo, type ReactElement } from 'react';
import useTheme from '../hooks/use-theme.js';
import Authentication from './header-authentication.js';
import Heading from './header-heading.js';

interface State {
  readonly backgroundColor: string;
}

function useHeader(): State {
  // Contexts
  const { backgroundHex } = useTheme();

  return {
    backgroundColor: backgroundHex,
  };
}

function Header(): ReactElement {
  const { backgroundColor } = useHeader();
  const { displayFontFamily } = useTheme();

  return (
    <header
      style={{
        alignItems: 'center',
        backgroundColor,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '60em',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        width: '100%',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <Heading />
        <span
          style={{
            display: 'block',
            fontFamily: `"Cairo Play", ${displayFontFamily}`,
            fontSize: '1em',
            marginBottom: '2em',
            marginTop: '-2em',
            paddingLeft: '1.85em',
          }}
        >
          software as a service
        </span>
      </div>
      <div>
        <Authentication />
      </div>
    </header>
  );
}

export default memo(Header);
