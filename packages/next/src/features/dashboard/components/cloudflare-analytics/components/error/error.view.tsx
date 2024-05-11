import { type ReactElement } from 'react';
import Section from '../../../../../../modules/quisi/section.js';
import Span from '../../../../../../modules/quisi/span.js';

interface Props {
  readonly children: string;
}

export default function CloudflareAnalyticsError({
  children,
}: Props): ReactElement {
  return (
    <Section header="Cloudflare Analytics">
      <Span element="p">{children}</Span>
    </Section>
  );
}
