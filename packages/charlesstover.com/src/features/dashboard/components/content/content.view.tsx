import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Link from '../../../../components/link';
import type NonSumMetricStats from '../../../../types/non-sum-metric-stats';
import Apdex from '../apdex';

export interface Props {
  readonly apdexError: string | null;
  readonly cumulativeLayoutShift: NonSumMetricStats;
  readonly firstInputDelay: NonSumMetricStats;
  readonly frustrated: Record<string, number>;
  readonly isApdexInitiated: boolean;
  readonly isApdexLoading: boolean;
  readonly largestContentfulPaint: NonSumMetricStats;
  readonly satisfied: Record<string, number>;
  readonly tolerated: Record<string, number>;
}

export default function DashboardContent({
  apdexError,
  cumulativeLayoutShift,
  firstInputDelay,
  frustrated,
  isApdexInitiated,
  isApdexLoading,
  largestContentfulPaint,
  satisfied,
  tolerated,
}: Props): ReactElement {
  return (
    <>
      <Container header="CharlesStover.com">
        <Div element="p">
          This dashboard showcases operational and performance metrics for{' '}
          <Link href="/">CharlesStover.com</Link>.
        </Div>
        <Div marginTop="large" textAlign="center">
          <Link href="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml">
            <img
              alt="GitHub workflow status"
              height={20}
              src="https://github.com/CharlesStover/charlesstover.com/actions/workflows/charlesstover-com.yml/badge.svg"
            />
          </Link>
        </Div>
      </Container>
      <Container header={<I18n>Status</I18n>} marginTop="large">
        Online
      </Container>
      <Container
        header={<I18n>Application Performance Index</I18n>}
        marginTop="large"
      >
        <Apdex
          error={apdexError}
          frustrated={frustrated}
          initiated={isApdexInitiated}
          loading={isApdexLoading}
          satisfied={satisfied}
          tolerated={tolerated}
        />
      </Container>
      <Container header={<I18n>Web Vitals</I18n>} marginTop="large">
        <table>
          <tbody>
            <tr>
              <th>
                <I18n>Cumulative Layout Shift</I18n>
              </th>
              <td>{JSON.stringify(cumulativeLayoutShift)}</td>
            </tr>
            <tr>
              <th>
                <I18n>First Input Delay</I18n>
              </th>
              <td>{JSON.stringify(firstInputDelay)}</td>
            </tr>
            <tr>
              <th>
                <I18n>Largest Contentful Paint</I18n>
              </th>
              <td>{JSON.stringify(largestContentfulPaint)}</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
