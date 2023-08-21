import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../../../components/container';

export default function SentryIssuesUninitiated(): ReactElement {
  return (
    <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
      <I18n>Initiating</I18n>
    </Container>
  );
}
