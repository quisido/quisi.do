import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import LoadingIcon from '../../../../../../modules/quisi/loading-icon.js';
import Section from '../../../../../../modules/quisi/section.js';

export default function SentryIssuesLoading(): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      <LoadingIcon /> {/*<I18n>Loading Sentry issues</I18n>*/}
    </Section>
  );
}
