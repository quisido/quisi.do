import { type ReactElement } from 'react';
import Link from '../modules/quisi/link.js';
import Section from '../modules/quisi/section.js';

export default function Home(): ReactElement {
  return (
    <Section>
      <Link feature="home" href="/" title="quisi.do">
        quisi.do
      </Link>{' '}
      is a front end software-as-a-service provider.
    </Section>
  );
}
