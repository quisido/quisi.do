import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import mapUnknownToString from 'unknown2string';
import Div from '../../../../components/div.js';
import Link from '../../../../components/link/index.js';
import Section from '../../../../components/section.js';
import validateString from '../../../../utils/validate-string.js';
import LastChecked from '../last-checked/index.js';
import OnlineStatus from '../online-status/index.js';
import useStatus from './status.hook.js';
import styles from './status.module.scss';

interface Props {
  readonly lastUptimeCheckStatus: boolean;
  readonly lastUptimeCheckTimestamp: number;
  readonly uptimeChecksError: boolean;
  readonly uptimeChecksInitiated: boolean;
  readonly uptimeChecksLoading: boolean;
  readonly uptimeErrors: readonly unknown[];
  readonly uptimeMessages: readonly unknown[];
}

const errorClassName: string = validateString(styles['error']);
const iconClassName: string = validateString(styles['icon']);
const infoClassName: string = validateString(styles['info']);
const messageClassName = validateString(styles['message']);
const messagesClassName = validateString(styles['messages']);
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

export default function DashboardStatus({
  lastUptimeCheckStatus,
  lastUptimeCheckTimestamp,
  uptimeChecksError,
  uptimeChecksInitiated,
  uptimeChecksLoading,
  uptimeErrors,
  uptimeMessages,
}: Props): ReactElement {
  const { ciCdAlt } = useStatus();

  return (
    <Section header={<I18n>Status</I18n>}>
      <Div display="flex" flexDirection="row" justifyContent="space-around">
        <Div>
          <Link
            feature="dashboard/status"
            href="https://github.com/quisido/quisi.do/actions/workflows/cd.yml"
            title="Continuous deployment workflow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={ciCdAlt}
              height={20}
              src="https://github.com/quisido/quisi.do/actions/workflows/cd.yml/badge.svg"
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
    </Section>
  );
}
