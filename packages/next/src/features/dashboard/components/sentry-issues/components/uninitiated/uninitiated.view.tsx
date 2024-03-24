import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../../../components/section.js';

export default function SentryIssuesUninitiated(): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      Initiating {/*<I18n>Initiating</I18n>*/}
    </Section>
  );
}
