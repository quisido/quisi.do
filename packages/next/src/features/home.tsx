import { type ReactElement } from 'react';
import Link from '../modules/quisi/link.js';
import Section from '../modules/quisi/section.js';
import ContentSecurityPolicy from './content-security-policy.jsx';

export default function Home(): ReactElement {
  return (
    <>
      <Section>
        <Link feature="home" href="/" title="quisi.do">
          quisi.do
        </Link>{' '}
        is a front end software-as-a-service provider.
      </Section>
      <ContentSecurityPolicy />
    </>
  );
}
