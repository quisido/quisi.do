'use client';

import { type ReactElement } from 'react';
import Link from '../components/link/index.js';
import Section from '../components/section.js';

export default function Home(): ReactElement {
  return (
    <Section>
      <Link feature="home" href="https://quisi.do/" title="quisi.do">
        quisi.do
      </Link>{' '}
      is a not-for-profit front end software-as-a-service.
    </Section>
  );
}
