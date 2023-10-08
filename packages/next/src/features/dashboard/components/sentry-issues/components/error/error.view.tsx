import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../../../components/container';
import Span from '../../../../../../components/span';

interface Props {
  readonly children: string;
}

export default function SentryIssuesError({ children }: Props): ReactElement {
  return (
    <Container header={<I18n>Sentry issues</I18n>} marginTop="large">
      <Span element="p">{children}</Span>
    </Container>
  );
}
