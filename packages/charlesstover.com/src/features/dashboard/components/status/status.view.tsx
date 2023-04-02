import I18n from 'lazy-i18n';
import { ReactElement } from 'react';
import mapUnknownToString from 'unknown2string';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Link from '../../../../components/link';
import validateString from '../../../../utils/validate-string';
import DailySessions from '../daily-sessions';
import OnlineStatus from '../online-status';
import LastChecked from '../last-checked';
import styles from './status.module.scss';

interface Props {
  readonly ciCdStatusAlt: string;
  readonly dailySessionCount: number;
  readonly lastUptimeCheckStatus: boolean;
  readonly lastUptimeCheckTimestamp: number;
  readonly uptimeChecksError: boolean;
  readonly uptimeChecksInitiated: boolean;
  readonly uptimeChecksLoading: boolean;
  readonly uptimeErrors: readonly unknown[];
  readonly uptimeMessages: readonly unknown[];
}

const errorClassName: string = validateString(styles.error);
const iconClassName: string = validateString(styles.icon);
const infoClassName: string = validateString(styles.info);
const messageClassName = validateString(styles.message);
const messagesClassName = validateString(styles.messages);
const NONE = 0;

const mapErrorToElement = (err: unknown): ReactElement => {
  const errStr: string = mapUnknownToString(err);
  return (
    <Div
      className={`${messageClassName} ${errorClassName}`}
      element="p"
      key={errStr}
    >
      <span className={`${iconClassName} ${infoClassName}`}>❌</span> {errStr}
    </Div>
  );
};

const mapMessageToElement = (message: unknown): ReactElement => {
  const messageStr: string = mapUnknownToString(message);
  return (
    <Div
      className={`${messageClassName} ${infoClassName}`}
      element="p"
      key={messageStr}
    >
      <span className={`${iconClassName} ${infoClassName}`}>ℹ</span>{' '}
      {messageStr}
    </Div>
  );
};

export default function Status({
  ciCdStatusAlt,
  dailySessionCount,
  lastUptimeCheckStatus,
  lastUptimeCheckTimestamp,
  uptimeChecksError,
  uptimeChecksInitiated,
  uptimeChecksLoading,
  uptimeErrors,
  uptimeMessages,
}: Readonly<Props>): ReactElement {
  return (
    <Container header={<I18n>Status</I18n>} marginTop="large">
      <Div display="flex" flexDirection="row" justifyContent="space-around">
        <Div>
          <Link href="https://github.com/CharlesStover/charlesstover.com/actions/workflows/cd.yml">
            <img
              alt={ciCdStatusAlt}
              height={20}
              src="https://github.com/CharlesStover/charlesstover.com/actions/workflows/cd.yml/badge.svg"
            />
          </Link>
        </Div>
        <OnlineStatus>{lastUptimeCheckStatus}</OnlineStatus>
        <LastChecked
          error={uptimeChecksError}
          initiated={uptimeChecksInitiated}
          loading={uptimeChecksLoading}
        >
          {lastUptimeCheckTimestamp}
        </LastChecked>
        <DailySessions>{dailySessionCount}</DailySessions>
      </Div>
      {uptimeErrors.length > NONE && (
        <Div className={messagesClassName}>
          {uptimeErrors.map(mapErrorToElement)}
        </Div>
      )}
      {uptimeMessages.length > NONE && (
        <Div className={messagesClassName}>
          {uptimeMessages.map(mapMessageToElement)}
        </Div>
      )}
    </Container>
  );
}
