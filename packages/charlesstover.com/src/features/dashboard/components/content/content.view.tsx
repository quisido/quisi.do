import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Link from '../../../../components/link';
import Span from '../../../../components/span';
import Apdex from '../apdex';
import DailySessions from '../daily-sessions';
import Errors from '../errors';
import WebVitals from '../web-vitals';
import useDashboardContent from './content.hook';

export interface Props {
  readonly apdexError: string | null;
  readonly clsP95: number;
  readonly clsTm95: number;
  readonly errorCountTimeSeries: Record<string, number>;
  readonly errorsError: string | null;
  readonly fidP95: number;
  readonly fidTm95: number;
  readonly frustratedTimeSeries: Record<string, number>;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly isErrorsInitiated: boolean;
  readonly isErrorsLoading: boolean;
  readonly isWebVitalsInitiated: boolean;
  readonly isWebVitalsLoading: boolean;
  readonly lcpP95: number;
  readonly lcpTm95: number;
  readonly satisfiedTimeSeries: Record<string, number>;
  readonly sessionCountTimeSeries: Record<string, number>;
  readonly toleratedTimeSeries: Record<string, number>;
  readonly webVitalsError: string | null;
}

const NONE = 0;

export default function DashboardContent({
  apdexError,
  clsP95,
  clsTm95,
  errorCountTimeSeries,
  errorsError,
  fidP95,
  fidTm95,
  frustratedTimeSeries,
  isApdexInitiated,
  isApdexLoading,
  isErrorsInitiated,
  isErrorsLoading,
  isWebVitalsInitiated,
  isWebVitalsLoading,
  lcpP95,
  lcpTm95,
  satisfiedTimeSeries,
  sessionCountTimeSeries,
  toleratedTimeSeries,
  webVitalsError,
}: Readonly<Props>): ReactElement {
  const { dailySessionCount, githubWorkflowStatusAlt } = useDashboardContent({
    sessionCountTimeSeries,
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
          <Span>
            <I18n>Online</I18n> ✅
          </Span>
          <Div>
            <Link href="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml">
              <img
                alt={githubWorkflowStatusAlt}
                height={20}
                src="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml/badge.svg"
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
