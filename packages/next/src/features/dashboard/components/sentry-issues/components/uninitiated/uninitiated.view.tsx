import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../../../components/section';

export default function SentryIssuesUninitiated(): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      <I18n>Initiating</I18n>
    </Section>
  );
}
