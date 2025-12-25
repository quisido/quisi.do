import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Div from '../modules/quisi/div.jsx';
import Section from '../modules/quisi/section.jsx';

export default function DataRetentionPolicy(): ReactElement {
  return (
    <Section header={<I18n>Data Retention &amp; Disposal Policy</I18n>}>
      <Div element="p" marginBottom="medium">
        quisi.do retains user data only as long as necessary to provide its
        services. When user data is no longer needed, quisi.do securely disposes
        of it in accordance with industry best practices.
      </Div>
    </Section>
  );
}
