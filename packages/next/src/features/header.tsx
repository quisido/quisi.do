'use client';

import { type ReactElement, memo } from 'react';
import Link from '../components/link/index.js';
import useTheme from '../hooks/use-theme.js';
import useHeader from './header/use-header.js';

function Header(): ReactElement {
  const { authenticateHref } = useHeader();
  const { displayFontFamily, displayFontWeight } = useTheme();

  return (
    <header
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1em',
        maxWidth: '60em',
        minWidth: 320,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <h1
          style={{
            fontFamily: displayFontFamily,
            fontSize: '1.5em',
            fontWeight: displayFontWeight,
            lineHeight: '1.5em',
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
            fontSize: '0.75em',
            marginTop: '-0.5em',
            paddingLeft: '1.5em',
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
