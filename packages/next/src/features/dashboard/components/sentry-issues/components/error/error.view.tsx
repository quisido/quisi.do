import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../../../components/section';
import Span from '../../../../../../components/span';

interface Props {
  readonly children: string;
}

export default function SentryIssuesError({ children }: Props): ReactElement {
  return (
    <Section header={<I18n>Sentry issues</I18n>}>
      <Span element="p">{children}</Span>
    </Section>
  );
}
