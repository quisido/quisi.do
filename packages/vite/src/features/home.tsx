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
      </Section>
      <Dashboard />
    </>
  );
}
