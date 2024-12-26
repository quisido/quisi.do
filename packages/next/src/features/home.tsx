import { type ReactElement } from 'react';
import Link from '../modules/quisi/link.js';
import Section from '../modules/quisi/section.js';
import Dashboard from './dashboard.jsx';

export default function Home(): ReactElement {
  return (
    <>
      <Section>
        <Link feature="home" href="/" title="quisi.do">
          quisi.do
        </Link>{' '}
        is an invite-only, front end platform software-as-a-service provider.
      </Section>
      <Dashboard />
    </>
  );
}
