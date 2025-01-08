'use client';

import I18n from 'lazy-i18n';
import {
  memo,
  useEffect,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import Gauge, { type Threshold } from '../modules/quisi/gauge.jsx';
import Paragraph from '../modules/quisi/paragraph.jsx';
import Section from '../modules/quisi/section.jsx';
import useAsyncState from '../modules/use-async-state/index.js';
import type DashboardApiResponse from '../types/dashboard-api-response.js';
import isDashboardApiResponse from '../utils/is-dashboard-api-response.js';
import validateString from '../utils/validate-string.js';
import styles from './dashboard.module.scss';

const GAUGE_CLASS_NAME: string = validateString(styles['gauge']);
const GAUGE_NEEDLE_CLASS_NAME: string = validateString(styles['gaugeNeedle']);
const LIST_CLASS_NAME: string = validateString(styles['list']);

const DASHBOARD_ENDPOINT: string = validateString(
  process.env['DASHBOARD_ENDPOINT'],
);

const NEGATIVE_ACTIVE_CLASS_NAME: string = validateString(
  styles['negativeActive'],
);

const NEGATIVE_INACTIVE_CLASS_NAME: string = validateString(
  styles['negativeInactive'],
);

const NEUTRAL_ACTIVE_CLASS_NAME: string = validateString(
  styles['neutralActive'],
);

const NEUTRAL_INACTIVE_CLASS_NAME: string = validateString(
  styles['neutralInactive'],
);

const POSITIVE_ACTIVE_CLASS_NAME: string = validateString(
  styles['positiveActive'],
);

const POSITIVE_INACTIVE_CLASS_NAME: string = validateString(
  styles['positiveInactive'],
);

const CLS_THRESHOLDS: readonly Threshold[] = [
  // Good
  {
    activeClassName: POSITIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: POSITIVE_INACTIVE_CLASS_NAME,
    to: 0.1,
  },

  // Needs improvement
  {
    activeClassName: NEUTRAL_ACTIVE_CLASS_NAME,
    inactiveClassName: NEUTRAL_INACTIVE_CLASS_NAME,
    to: 0.25,
  },

  // Poor
  {
    activeClassName: NEGATIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: NEGATIVE_INACTIVE_CLASS_NAME,
  },
];

const FCP_THRESHOLDS: readonly Threshold[] = [
  // Good
  {
    activeClassName: POSITIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: POSITIVE_INACTIVE_CLASS_NAME,
    to: 1800,
  },

  // Needs improvement
  {
    activeClassName: NEUTRAL_ACTIVE_CLASS_NAME,
    inactiveClassName: NEUTRAL_INACTIVE_CLASS_NAME,
    to: 3000,
  },

  // Poor
  {
    activeClassName: NEGATIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: NEGATIVE_INACTIVE_CLASS_NAME,
  },
];

const INP_THRESHOLDS: readonly Threshold[] = [
  // Good
  {
    activeClassName: POSITIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: POSITIVE_INACTIVE_CLASS_NAME,
    to: 200,
  },

  // Needs improvement
  {
    activeClassName: NEUTRAL_ACTIVE_CLASS_NAME,
    inactiveClassName: NEUTRAL_INACTIVE_CLASS_NAME,
    to: 500,
  },

  // Poor
  {
    activeClassName: NEGATIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: NEGATIVE_INACTIVE_CLASS_NAME,
  },
];

const LCP_THRESHOLDS: readonly Threshold[] = [
  // Good
  {
    activeClassName: POSITIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: POSITIVE_INACTIVE_CLASS_NAME,
    to: 2500,
  },

  // Needs improvement
  {
    activeClassName: NEUTRAL_ACTIVE_CLASS_NAME,
    inactiveClassName: NEUTRAL_INACTIVE_CLASS_NAME,
    to: 4000,
  },

  // Poor
  {
    activeClassName: NEGATIVE_ACTIVE_CLASS_NAME,
    inactiveClassName: NEGATIVE_INACTIVE_CLASS_NAME,
  },
];

function DashboardWrapper({ children }: PropsWithChildren): ReactElement {
  return (
    <Section header={<I18n>quisi.do's dashboard</I18n>}>{children}</Section>
  );
}

function Dashboard(): ReactElement {
  const { data, error, initiated, loading, request } =
    useAsyncState<DashboardApiResponse>();

  useEffect((): void => {
    void request(async (): Promise<DashboardApiResponse> => {
      const response: Response = await window.fetch(DASHBOARD_ENDPOINT);
      const json: unknown = await response.json();
      if (!isDashboardApiResponse(json)) {
        throw new Error('Unknown response');
      }

      return json;
    });
  }, [request]);

  if (!initiated) {
    return <DashboardWrapper>Initializing</DashboardWrapper>;
  }

  if (loading) {
    return <DashboardWrapper>Loading</DashboardWrapper>;
  }

  if (typeof error !== 'undefined') {
    return (
      <DashboardWrapper>
        <Paragraph>
          <strong>An error occurred:</strong> {error}
        </Paragraph>
      </DashboardWrapper>
    );
  }

  const {
    cls: [, cls],
    fcp: [, fcp],
    inp: [, inp],
    lcp: [, lcp],
    loadingTime: [, loadingTime],
  } = data;
  return (
    <DashboardWrapper>
      <ul className={LIST_CLASS_NAME}>
        <li>
          <Paragraph>First contentful paint p75: {fcp}ms</Paragraph>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            min={0}
            thresholds={FCP_THRESHOLDS}
            value={fcp}
          />
        </li>
        <li>
          <Paragraph>Largest contentful paint p75: {lcp}ms</Paragraph>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            min={0}
            thresholds={LCP_THRESHOLDS}
            value={lcp}
          />
        </li>
        <li>
          <Paragraph>Cumulative layout shift p75: {cls}</Paragraph>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            max={1}
            min={0}
            thresholds={CLS_THRESHOLDS}
            value={cls}
          />
        </li>
        <li>
          <Paragraph>Interaction to next paint p75: {inp}ms</Paragraph>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            min={0}
            thresholds={INP_THRESHOLDS}
            value={inp}
          />
        </li>
        <li>
          <Paragraph>Loading time p75: {loadingTime}ms</Paragraph>
        </li>
      </ul>
      {/* <h3 style={{ margin: 0 }}>Scalability</h3>
      <ul>
        <li>Requests per second</li>
        <li>ROI, must be &ge; 1</li>
        <li>Availability</li>
        <li>Market funnel, $1 spent &ge; $1 earned</li>
      </ul>
      <h3 style={{ margin: 0 }}>Security</h3>
      <ul>
        <li>CSRF blocked</li>
        <li>Cloudflare DDoS + blocked IP counts</li>
        <li>AuthN/AuthZ error counts</li>
        <li>Anomaly detection on the above ratios</li>
      </ul> */}
    </DashboardWrapper>
  );
}

export default memo(Dashboard);
