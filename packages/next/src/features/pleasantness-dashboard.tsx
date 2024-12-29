import { useEffect, type ReactElement } from 'react';
import Gauge, { type Threshold } from '../modules/quisi/gauge.jsx';
import useAsyncState from '../modules/use-async-state/index.js';
import type DashboardApiResponse from '../types/dashboard-api-response.js';
import isDashboardApiResponse from '../utils/is-dashboard-api-response.js';
import validateString from '../utils/validate-string.js';
import styles from './pleasantness-dashboard.module.scss';

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
    to: 1,
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
    to: 10000,
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
    to: 1000,
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
    to: 10000,
  },
];

export default function PleasantnessDashboard(): ReactElement {
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
    return (
      <section>
        <h3 style={{ margin: 0 }}>Pleasantness</h3>
        <ul className={LIST_CLASS_NAME}>
          <li>Cumulative layout shift p75 is initiating...</li>
          <li>First contentful paint p75 is initiating...</li>
          <li>Interaction to next paint p75 is initiating...</li>
          <li>Largest contentful paint p75 is initiating...</li>
          <li>Loading time p75 is initiating...</li>
        </ul>
      </section>
    );
  }

  if (loading) {
    return (
      <section>
        <h3 style={{ margin: 0 }}>Pleasantness</h3>
        <ul className={LIST_CLASS_NAME}>
          <li>Cumulative layout shift p75 is loading...</li>
          <li>First contentful paint p75 is loading...</li>
          <li>Interaction to next paint p75 is loading...</li>
          <li>Largest contentful paint p75 is loading...</li>
          <li>Loading time p75 is loading...</li>
        </ul>
      </section>
    );
  }

  if (typeof error !== 'undefined') {
    return (
      <section>
        <h3 style={{ margin: 0 }}>Pleasantness</h3>
        <p style={{ margin: 0 }}>
          <strong>An error occurred:</strong>
          {error}
        </p>
      </section>
    );
  }

  const { cls, fcp, inp, lcp, lt } = data;
  return (
    <section>
      <h3 style={{ margin: 0 }}>Pleasantness</h3>
      <ul className={LIST_CLASS_NAME}>
        <li>
          <p style={{ margin: 0 }}>Cumulative layout shift p75: {cls}</p>
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
          <p style={{ margin: 0 }}>First contentful paint p75: {fcp}ms</p>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            max={10000}
            min={0}
            thresholds={FCP_THRESHOLDS}
            value={fcp}
          />
        </li>
        <li>
          <p style={{ margin: 0 }}>Interaction to next paint p75: {inp}ms</p>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            max={1000}
            min={0}
            thresholds={INP_THRESHOLDS}
            value={inp}
          />
        </li>
        <li>
          <p style={{ margin: 0 }}>Largest contentful paint p75: {lcp}ms</p>
          <Gauge
            className={GAUGE_CLASS_NAME}
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            max={10000}
            min={0}
            thresholds={LCP_THRESHOLDS}
            value={lcp}
          />
        </li>
        <li>Loading time p75: {lt}ms</li>
      </ul>
    </section>
  );
}
