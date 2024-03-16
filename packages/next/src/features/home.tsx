'use client';

import { type ReactElement } from 'react';
import Section from '../components/section.js';
import Span from '../components/span.js';

export default function Home(): ReactElement {
  return (
    <Section>
      <ul
        style={{
          alignItems: 'stretch',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          listStylePosition: 'inside',
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
        }}
      >
        <li>
          <Span>Open source</Span>
        </li>
        <li>
          <Span>Transparent</Span>
        </li>
        <li>
          <Span>Not for profit</Span>
        </li>
      </ul>
    </Section>
  );
}
