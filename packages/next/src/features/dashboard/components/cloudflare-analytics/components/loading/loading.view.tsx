import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import LoadingIcon from '../../../../../../components/loading-icon.js';
import Section from '../../../../../../components/section.js';

export default function CloudflareAnalyticsLoading(): ReactElement {
  return (
    <Section header={<I18n>Cloudflare analytics</I18n>}>
      <LoadingIcon /> <I18n>Loading Cloudflare analytics</I18n>
    </Section>
  );
}
