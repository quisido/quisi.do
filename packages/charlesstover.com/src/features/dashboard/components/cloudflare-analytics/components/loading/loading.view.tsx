import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../../../components/container';
import LoadingIcon from '../../../../../../components/loading-icon';

export default function CloudflareAnalyticsLoading(): ReactElement {
  return (
    <Container header={<I18n>Cloudflare analytics</I18n>} marginTop="large">
      <LoadingIcon /> <I18n>Loading Cloudflare analytics</I18n>
    </Container>
  );
}
