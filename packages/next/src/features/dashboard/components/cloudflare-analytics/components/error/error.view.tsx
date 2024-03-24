import { type ReactElement } from 'react';
import Section from '../../../../../../components/section.js';
import Span from '../../../../../../components/span.js';

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
