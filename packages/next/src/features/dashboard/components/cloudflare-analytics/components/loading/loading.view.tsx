import { type ReactElement } from 'react';
import LoadingIcon from '../../../../../../components/loading-icon.js';
import Section from '../../../../../../components/section.js';

export default function CloudflareAnalyticsLoading(): ReactElement {
  return (
    <Section header="Cloudflare Analytics">
      <LoadingIcon /> {/* <I18n>Loading Cloudflare analytics</I18n> */}
    </Section>
  );
}
