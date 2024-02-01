import type { ReactElement } from 'react';

export default function QuisidoDotComNotification(): ReactElement {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: 'Merienda, serif',
        // letterSpacing: -1,
        // transform: 'scale(1.25, 1)',
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
  );
}
