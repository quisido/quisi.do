'use client';

import { type ReactElement } from 'react';
import Button from '../components/button.js';
import Section from '../components/section.js';
import useHome from './home/use-home.js';

export default function Home(): ReactElement {
  const { authenticateHref } = useHome();

  return (
    <Section
      actions={
        <Button feature="home" href={authenticateHref} variant="primary">
          Authenticate
        </Button>
      }
    >
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
        <li>Open source</li>
        <li>Transparent</li>
        <li>Not for profit</li>
      </ul>
    </Section>
  );
}
