import { type ReactElement } from 'react';
import LoadingIcon from '../../../../../../modules/quisi/loading-icon.js';
import Section from '../../../../../../modules/quisi/section.js';

export default function CloudflareAnalyticsLoading(): ReactElement {
  return (
    <Section header="Cloudflare Analytics">
      <LoadingIcon /> {/* <I18n>Loading Cloudflare analytics</I18n> */}
    </Section>
  );
}
