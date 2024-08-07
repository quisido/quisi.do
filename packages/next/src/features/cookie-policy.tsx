import { type ReactElement } from 'react';
import Div from '../modules/quisi/div.jsx';
import Header from '../modules/quisi/header.jsx';
import Section from '../modules/quisi/section.jsx';

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
