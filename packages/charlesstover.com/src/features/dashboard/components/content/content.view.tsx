import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Gauge from '../../../../components/gauge';
import Link from '../../../../components/link';
import Span from '../../../../components/span';
import type NonSumMetricStats from '../../../../types/non-sum-metric-stats';
import sum from '../../../../utils/sum';
import Apdex from '../apdex';
import ErrorRate from '../error-rate';

export interface Props {
  readonly apdexError: string | null;
  readonly cumulativeLayoutShift: NonSumMetricStats;
  readonly errorCount: Record<string, number>;
  readonly firstInputDelay: NonSumMetricStats;
  readonly frustrated: Record<string, number>;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly largestContentfulPaint: NonSumMetricStats;
  readonly satisfied: Record<string, number>;
  readonly sessionCount: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

const BASE = 10;
const CUMULATIVE_LAYOUT_GOOD_THRESHOLD = 0.1;
const CUMULATIVE_LAYOUT_POOR_THRESHOLD = 0.25;
const CUMULATIVE_LAYOUT_SHIFT_PRECISION = 2;
const DAYS_PER_WEEK = 7;
const FIRST_INPUT_DELAY_GOOD_THRESHOLD = 100;
const FIRST_INPUT_DELAY_POOR_THRESHOLD = 300;
const LARGEST_CONTENTFUL_PAINT_GOOD_THRESHOLD = 2500;
const LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD = 4000;
const NONE = 0;

const clsPow: number = Math.pow(BASE, CUMULATIVE_LAYOUT_SHIFT_PRECISION);

enum Status {
  Good = 'good',
  NeedsImprovement = 'needs-improvement',
  Poor = 'poor',
}

const mapStatusToIcon = (status: Status): string => {
  switch (status) {
    case Status.Good:
      return '✅';
    case Status.NeedsImprovement:
      return '⚠';
    case Status.Poor:
      return '❌';
  }
};

export default function DashboardContent({
  apdexError,
  cumulativeLayoutShift,
  errorCount,
  firstInputDelay,
  frustrated,
  isApdexInitiated,
  isApdexLoading,
  largestContentfulPaint,
  satisfied,
  sessionCount,
  tolerated,
}: Readonly<Props>): ReactElement {
  const errorSum: number = Object.values(errorCount).reduce(sum, NONE);

  const dailySessionCount: number = Math.ceil(
    Object.values(sessionCount).reduce(sum, NONE) / DAYS_PER_WEEK,
  );

  const p95cls: number =
    Math.round(
      Object.values(cumulativeLayoutShift.p95).reduce(sum, NONE) * clsPow,
    ) / clsPow;

  const p95fid: number = Math.round(
    Object.values(firstInputDelay.p95).reduce(sum, NONE),
  );

  const p95lcp: number = Math.round(
    Object.values(largestContentfulPaint.p95).reduce(sum, NONE),
  );

  const tm95cls: number =
    Math.round(
      Object.values(cumulativeLayoutShift.tm95).reduce(sum, NONE) * clsPow,
    ) / clsPow;

  const tm95fid: number = Math.round(
    Object.values(firstInputDelay.tm95).reduce(sum, NONE),
  );

  const tm95lcp: number = Math.round(
    Object.values(largestContentfulPaint.tm95).reduce(sum, NONE),
  );

  const clsStatus: Status =
    tm95cls <= CUMULATIVE_LAYOUT_GOOD_THRESHOLD &&
    p95cls <= CUMULATIVE_LAYOUT_POOR_THRESHOLD
      ? Status.Good
      : tm95cls <= CUMULATIVE_LAYOUT_POOR_THRESHOLD
      ? Status.NeedsImprovement
      : Status.Poor;

  const fidStatus: Status =
    tm95fid <= FIRST_INPUT_DELAY_GOOD_THRESHOLD &&
    p95fid <= FIRST_INPUT_DELAY_POOR_THRESHOLD
      ? Status.Good
      : tm95fid <= FIRST_INPUT_DELAY_POOR_THRESHOLD
      ? Status.NeedsImprovement
      : Status.Poor;

  const lcpStatus: Status =
    tm95lcp <= LARGEST_CONTENTFUL_PAINT_GOOD_THRESHOLD &&
    p95lcp <= LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD
      ? Status.Good
      : tm95lcp <= LARGEST_CONTENTFUL_PAINT_POOR_THRESHOLD
      ? Status.NeedsImprovement
      : Status.Poor;

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
          <Span>Online ✅</Span>
          <Div>
            <Link href="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml">
              <img
                alt="GitHub workflow status"
                height={20}
                src="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml/badge.svg"
              />
            </Link>
          </Div>
          <Div>
            <I18n count={dailySessionCount}>$count sessions/day</I18n>
          </Div>
        </Div>
      </Container>
      <Container
        header={
          <>
            <I18n>Errors</I18n> ({errorSum})
          </>
        }
        marginTop="large"
      >
        <ErrorRate errorCount={errorCount} sessionCount={sessionCount} />
      </Container>
      <Apdex
        error={apdexError}
        frustrated={frustrated}
        initiated={isApdexInitiated}
        loading={isApdexLoading}
        satisfied={satisfied}
        tolerated={tolerated}
      />
      <Container
        header={
          <>
            <I18n>Web Vitals</I18n>{' '}
            {clsStatus === Status.Poor ||
            fidStatus === Status.Poor ||
            lcpStatus === Status.Poor
              ? mapStatusToIcon(Status.Poor)
              : clsStatus === Status.NeedsImprovement ||
                fidStatus === Status.NeedsImprovement ||
                lcpStatus === Status.NeedsImprovement
              ? mapStatusToIcon(Status.NeedsImprovement)
              : mapStatusToIcon(Status.Good)}
          </>
        }
        marginTop="large"
      >
        <Div display="flex" justifyContent="space-around">
          <Div display="flex" flexDirection="column">
            <Span>
              <I18n>Cumulative Layout Shift</I18n> {mapStatusToIcon(clsStatus)}
            </Span>
            <Gauge
              max={0.1}
              size={240}
              value={{
                average: tm95cls,
                max: p95cls,
              }}
            />
          </Div>
          <Div>
            <I18n>First Input Delay</I18n> {mapStatusToIcon(fidStatus)}
            <Gauge
              max={300}
              size={240}
              units="ms"
              value={{
                average: tm95fid,
                max: p95fid,
              }}
            />
          </Div>
          <Div>
            <I18n>Largest Contentful Paint</I18n> {mapStatusToIcon(lcpStatus)}
            <Gauge
              max={4000}
              size={240}
              units="ms"
              value={{
                average: tm95lcp,
                max: p95lcp,
              }}
            />
          </Div>
        </Div>
      </Container>
    </>
  );
}
