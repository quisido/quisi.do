import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';

interface Props {
  readonly children: unknown;
  readonly error: string | null;
  readonly initiated: boolean;
  readonly loading: boolean;
}

export default function Uptime({
  children,
  error,
  initiated,
  loading,
}: Readonly<Props>): ReactElement {
  if (!initiated) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        {/* TODO: Replace "Online" with "Unknown" when user is offline. */}
        <Div>
          <I18n>Online</I18n> ✅
        </Div>
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        {/* TODO: Replace "Online" with "Unknown" when user is offline. */}
        <Div>
          <I18n>Online</I18n> ✅
        </Div>
        <Span element="p">
          {error === 'Failed to fetch'
            ? 'Uptime incidents are currently private.'
            : error}
        </Span>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        {/* TODO: Replace "Online" with "Unknown" when user is offline. */}
        <Div>
          <I18n>Online</I18n> ✅
        </Div>
        <LoadingIcon /> <I18n>Loading uptime incidents</I18n>
      </Container>
    );
  }

  return <>{JSON.stringify(children)}</>;
}
