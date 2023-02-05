import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../components/container';
import Div from '../../components/div';
import Link from '../../components/link';
import RumMetrics from '../../types/rum-metrics';
import Apdex from './components/apdex';
import DailySessions from './components/daily-sessions';
import Errors from './components/errors';
import Uptime from './components/uptime';
import WebVitals from './components/web-vitals';
import useDashboard from './dashboard.hook';

export interface Props {
  readonly onRumMetricsRequest: () => Promise<RumMetrics>;
  readonly onUptimeRequest: () => Promise<unknown>;
}

const NONE = 0;

const GITHUB_WORKFLOW_STATUS_BADGE_SRC =
  'https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml/badge.svg';

const GITHUB_WORKFLOW_STATUS_HREF =
  'https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml';

export default function Dashboard({
  onRumMetricsRequest,
  onUptimeRequest,
}: Readonly<Props>): ReactElement {
  const {
    apdexError,
    clsP95,
    clsTm95,
    dailySessionCount,
    errorCountTimeSeries,
    errorsError,
    fidP95,
    fidTm95,
    frustratedTimeSeries,
    githubWorkflowStatusAlt,
    isApdexInitiated,
    isApdexLoading,
    isErrorsInitiated,
    isErrorsLoading,
    isUptimeInitiated,
    isUptimeLoading,
    isWebVitalsInitiated,
    isWebVitalsLoading,
    lcpP95,
    lcpTm95,
    satisfiedTimeSeries,
    sessionCountTimeSeries,
    toleratedTimeSeries,
    uptime,
    uptimeError,
    webVitalsError,
  } = useDashboard({
    onRumMetricsRequest,
    onUptimeRequest,
  });

  return (
    <>
      <Container header="CharlesStover.com">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link href="/">CharlesStover.com</Link>.
        </Div>
      </Container>
      <Container header={<I18n>Status</I18n>} marginTop="large">
        <Div display="flex" flexDirection="row" justifyContent="space-around">
          <Div>
            <Link href={GITHUB_WORKFLOW_STATUS_HREF}>
              <img
                alt={githubWorkflowStatusAlt}
                height={20}
                src={GITHUB_WORKFLOW_STATUS_BADGE_SRC}
              />
            </Link>
          </Div>
          {dailySessionCount > NONE && (
            <Div>
              <DailySessions>{dailySessionCount}</DailySessions>
            </Div>
          )}
        </Div>
      </Container>
      <Uptime
        error={uptimeError}
        initiated={isUptimeInitiated}
        loading={isUptimeLoading}
      >
        {uptime}
      </Uptime>
      <Errors
        error={errorsError}
        errorCountTimeSeries={errorCountTimeSeries}
        initiated={isErrorsInitiated}
        loading={isErrorsLoading}
        sessionCountTimeSeries={sessionCountTimeSeries}
      />
      <Apdex
        error={apdexError}
        frustratedTimeSeries={frustratedTimeSeries}
        initiated={isApdexInitiated}
        loading={isApdexLoading}
        satisfiedTimeSeries={satisfiedTimeSeries}
        toleratedTimeSeries={toleratedTimeSeries}
      />
      <WebVitals
        clsP95={clsP95}
        clsTm95={clsTm95}
        error={webVitalsError}
        fidP95={fidP95}
        fidTm95={fidTm95}
        initiated={isWebVitalsInitiated}
        lcpP95={lcpP95}
        lcpTm95={lcpTm95}
        loading={isWebVitalsLoading}
      />
    </>
  );
}
