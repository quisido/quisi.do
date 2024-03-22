'use client';

import { type ReactElement, memo } from 'react';
import Link from '../components/link/index.js';
import useTheme from '../hooks/use-theme.js';
import useHeader from './header/use-header.js';

function Header(): ReactElement {
  const { authenticateHref } = useHeader();
  const { backgroundHex, displayFontFamily, displayFontWeight } = useTheme();

  return (
    <header
      style={{
        alignItems: 'center',
        backgroundColor: backgroundHex,
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
        <h1
          style={{
            fontFamily: `"Cairo Play", ${displayFontFamily}`,
            fontSize: '3em',
            fontWeight: displayFontWeight,
            lineHeight: '4rem',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            padding: 0,
            textAlign: 'left',
          }}
        >
          quisi.do
        </h1>
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
        <Link feature="header" href={authenticateHref} title="Authenticate">
          Authenticate
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
