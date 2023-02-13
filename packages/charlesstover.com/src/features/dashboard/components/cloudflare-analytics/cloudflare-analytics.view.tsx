import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import mapBudgetToPercentage from './utils/map-budget-to-percentage';

interface Props {
  readonly budget: number;
  readonly error: string | null;
  readonly initiated: boolean;
  readonly loading: boolean;
}

export default function CloudflareAnalytics({
  budget,
  error,
  initiated,
  loading,
}: Readonly<Props>): ReactElement {
  if (!initiated) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <LoadingIcon /> <I18n>Loading Cloudflare analytics</I18n>
      </Container>
    );
  }

  return (
    <Container header="Cloudflare analytics" marginTop="large">
      <Span element="p">
        Remaining budget: {mapBudgetToPercentage(budget)}%
      </Span>
    </Container>
  );
}
