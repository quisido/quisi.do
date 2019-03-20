import type { ReactElement } from 'react';
import Div from '../components/div.js';
import Header from '../components/header/index.js';
import Section from '../components/section.js';

export default function CookiePolicy(): ReactElement {
  return (
    <Section header={<Header>Cookie Policy</Header>}>
      <Div element="p">
        quisi.do&apos;s cookie policy will be documented after its services are
        finalized.
      </Div>
    </Section>
  );
}
