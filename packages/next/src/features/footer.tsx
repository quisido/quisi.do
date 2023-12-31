import type { ReactElement } from 'react';
import Emoji from '../components/emoji';

export default function Footer(): ReactElement {
  return (
    <aside
      style={{
        backgroundColor: '#40f0c0',
        borderColor: '#40f0c0',
        borderStyle: 'outset',
        borderWidth: '0 0 1px 0',
        color: '#002010',
        fontSize: '0.9em',
        left: 0,
        lineHeight: '1em',
        padding: '0.5em 1em',
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      <Emoji>🧑‍🎨</Emoji>{' '}
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'Caveat, serif',
          transform: 'scale(1.25, 1)',
          transformOrigin: '0 50%',
        }}
      >
        Looking for Jaq Quisido? Visit{' '}
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
    </aside>
  );
}
