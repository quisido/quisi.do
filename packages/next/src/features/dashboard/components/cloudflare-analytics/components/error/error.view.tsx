import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../../../components/section.js';
import Span from '../../../../../../components/span/index.js';

interface Props {
  readonly children: string;
}

export default function CloudflareAnalyticsError({
  children,
}: Props): ReactElement {
  return (
    <Section header={<I18n>Cloudflare analytics</I18n>}>
      <Span element="p">{children}</Span>
    </Section>
  );
}
