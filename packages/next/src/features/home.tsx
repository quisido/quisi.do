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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        <ul style={{ flexGrow: 1 }}>
          <li>Open source</li>
          <li>Transparent</li>
          <li>Not for profit</li>
        </ul>
        <ul style={{ flexGrow: 1 }}>
          <li>Educate</li>
          <li>Empower</li>
          <li>Heal</li>
        </ul>
      </div>
    </Section>
  );
}
