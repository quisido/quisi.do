import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import OnlineStatus from '../online-status';

interface Props {
  readonly error: string | null;
  readonly initiated: boolean;
  readonly lastCheckedStatus: boolean;
  readonly lastCheckedTimestamp: number;
  readonly loading: boolean;
  readonly uptimeErrors: readonly unknown[];
  readonly uptimeMessages: readonly unknown[];
}

const NONE = 0;

export default function UptimeChecks({
  error,
  initiated,
  lastCheckedStatus,
  lastCheckedTimestamp,
  loading,
  uptimeErrors,
  uptimeMessages,
}: Readonly<Props>): ReactElement {
  if (!initiated) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        <Div>
          <OnlineStatus>{lastCheckedStatus}</OnlineStatus>
        </Div>
        <Div>
          <I18n>Initiating</I18n>
        </Div>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        <Div>
          <OnlineStatus>{lastCheckedStatus}</OnlineStatus>
        </Div>
        <Div element="p">
          {error === 'Failed to fetch'
            ? 'Uptime incidents are currently private.'
            : error}
        </Div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container header={<I18n>Uptime</I18n>} marginTop="large">
        <Div>
          <OnlineStatus>{lastCheckedStatus}</OnlineStatus>
        </Div>
        <Div>
          <LoadingIcon /> <I18n>Loading uptime incidents</I18n>
        </Div>
      </Container>
    );
  }

  return (
    <Container header={<I18n>Uptime</I18n>} marginTop="large">
      <Div>
        <OnlineStatus>{lastCheckedStatus}</OnlineStatus>
      </Div>
      <Div>Last checked: {new Date(lastCheckedTimestamp).toLocaleString()}</Div>
      {uptimeErrors.length > NONE && (
        <Div>Uptime errors: {JSON.stringify(uptimeErrors)}</Div>
      )}
      {uptimeMessages.length > NONE && (
        <Div>Uptime messages: {JSON.stringify(uptimeMessages)}</Div>
      )}
    </Container>
  );
}
