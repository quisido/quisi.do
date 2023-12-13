'use client';

import { type ReactElement } from 'react';
// import Button from '../../components/button';
import Section from '../../components/section';

export default function Home(): ReactElement {
  return (
    <Section
    // actions={
    //   <Button feature="home" variant="primary">
    //     Authenticate
    //   </Button>
    // }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'stretch',
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
