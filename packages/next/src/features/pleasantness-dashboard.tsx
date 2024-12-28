import { useEffect, type ReactElement } from 'react';
import Gauge, { type Threshold } from '../modules/quisi/gauge.jsx';
import useAsyncState from '../modules/use-async-state/index.js';
import type DashboardApiResponse from '../types/dashboard-api-response.js';
import validateString from '../utils/validate-string.js';
import styles from './pleasantness-dashboard.module.scss';

/*
Const DASHBOARD_ENDPOINT: string = validateString(
  process.env['DASHBOARD_ENDPOINT'],
);
*/

const GAUGE_NEEDLE_CLASS_NAME: string = validateString(styles['gaugeNeedle']);

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

export default function PleasantnessDashboard(): ReactElement {
  const { data, error, initiated, loading, request } =
    useAsyncState<DashboardApiResponse>();

  useEffect((): void => {
    void request((): Promise<DashboardApiResponse> => {
      /*
      Const response: Response = await window.fetch(DASHBOARD_ENDPOINT);
      const json: unknown = await response.json();
      if (!isDashboardApiResponse(json)) {
        throw new Error('Unknown response');
      }

      return json;
      */
      return Promise.resolve({
        cls: 0.2,
        code: 1,
        fcp: 3027,
        inp: 8,
        lcp: 3027,
        lt: 3150,
      });
    });
  }, [request]);

  if (!initiated) {
    return (
      <section>
        <h3>Pleasantness</h3>
        <ul>
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
        <h3>Pleasantness</h3>
        <ul>
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
        <h3>Pleasantness</h3>
        <p>
          <strong>An error occurred:</strong>
          {error}
        </p>
      </section>
    );
  }

  const { cls, fcp, inp, lcp, lt } = data;
  return (
    <section>
      <h3>Pleasantness</h3>
      <ul>
        <li>
          <p>Cumulative layout shift p75: {cls}</p>
          <Gauge
            needleClassName={GAUGE_NEEDLE_CLASS_NAME}
            max={1}
            min={0}
            thresholds={CLS_THRESHOLDS}
            value={cls}
          />
        </li>
        <li>First contentful paint p75: {fcp}ms</li>
        <li>Interaction to next paint p75: {inp}ms</li>
        <li>Largest contentful paint p75: {lcp}ms</li>
        <li>Loading time p75: {lt}ms</li>
      </ul>
    </section>
  );
}
