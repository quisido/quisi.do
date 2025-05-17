import { type ReactElement } from 'react';
import Paragraph from '../modules/quisi/paragraph.jsx';
import Section from '../modules/quisi/section.js';
import Dashboard from './dashboard.jsx';

export default function Home(): ReactElement {
  return (
    <>
      <Section>
        <Paragraph>
          quisi.do is an invite-only, software-as-a-service provider for front
          end platforms.
        </Paragraph>
        {/*
        <NoteSection>
          <Note icon={<Emoji>🕰️</Emoji>}>
            Detect{' '}
            <Link
              feature="home"
              href="https://en.wikipedia.org/wiki/Cross-site_scripting"
              title="Cross-site scripting - Wikipedia"
            >
              XSS
            </Link>{' '}
            and{' '}
            <Link
              feature="home"
              href="https://en.wikipedia.org/wiki/Clickjacking"
              title="Clickjacking - Wikipedia"
            >
              clickjacking
            </Link>{' '}
            <em>today</em>.
          </Note>
          <Note icon={<Emoji>🩺</Emoji>}>
            Diagnose issues in <em>seconds</em>.
          </Note>
          <Note icon={<Emoji>📈</Emoji>}>
            Always observable. Always scalable.
          </Note>
        </NoteSection>
        */}
      </Section>
      {/* <ContentSecurityPolicy /> */}
      <Dashboard />
    </>
  );
}
