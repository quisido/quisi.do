import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Section from '../../../../../../components/section';
import LoadingIcon from '../../../../../../components/loading-icon';

export default function CloudflareAnalyticsLoading(): ReactElement {
  return (
    <Section header={<I18n>Cloudflare analytics</I18n>}>
      <LoadingIcon /> <I18n>Loading Cloudflare analytics</I18n>
    </Section>
  );
}
