'use client';

import { useButton } from '@react-aria/button';
import { type ReactElement, useRef } from 'react';
import Emoji from '../components/emoji.js';
import useLocalStorage from '../hooks/use-local-storage.js';
import LocalStorageItem from '../constants/local-storage-item.js';
import useTheme from '../hooks/use-theme.js';

export default function Footer(): ReactElement | null {
  const { secondaryHex } = useTheme();
  const [show, setShow] = useLocalStorage(LocalStorageItem.QuisidoDotCom);

  const { buttonProps } = useButton(
    {
      onPress: (): void => {
        setShow('false');
      },
    },
    useRef(null),
  );

  if (show === 'false') {
    return null;
  }

  return (
    <aside
      style={{
        backgroundColor: secondaryHex,
        borderColor: secondaryHex,
        borderStyle: 'outset',
        borderWidth: '0 0 1px 0',
        boxSizing: 'border-box',
        color: '#002010',
        display: 'flex',
        fontSize: '1em',
        gap: '0.5em',
        left: 0,
        lineHeight: '1em',
        padding: '0.5em 1em',
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      <Emoji>🧑‍🎨</Emoji>{' '}
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'Caveat, serif',
            transform: 'scale(1.25, 1)',
            transformOrigin: '0 50%',
          }}
        >
          Looking for the artist <strong>Jaq Quisido</strong>? Visit{' '}
          <a
            href="https://quisido.com/"
            rel="noopener"
            target="_blank"
            style={{
              color: '#e03060',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            title="Jaq Quisido's portfolio"
          >
            quisido.com
          </a>
          .
        </span>
      </div>
      <button
        {...buttonProps}
        style={{
          backgroundColor: 'transparent',
          borderWidth: 0,
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <Emoji>❌</Emoji>
      </button>
    </aside>
  );
}
