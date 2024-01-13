import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import LoadingIcon from '../../../../../../components/loading-icon/index.js';
import Section from '../../../../../../components/section.js';

export default function SentryIssuesLoading(): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      <LoadingIcon /> <I18n>Loading Sentry issues</I18n>
    </Section>
  );
}
