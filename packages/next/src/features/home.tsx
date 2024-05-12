'use client';

import { type ReactElement } from 'react';
import Link from '../modules/quisi/link.js';
import Section from '../modules/quisi/section.js';

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
