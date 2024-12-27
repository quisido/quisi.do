import { useEffect, type ReactElement } from 'react';
import Gauge from '../modules/quisi/gauge.jsx';
import useAsyncState from '../modules/use-async-state/index.js';
import type DashboardApiResponse from '../types/dashboard-api-response.js';

/*
Const DASHBOARD_ENDPOINT: string = validateString(
  process.env['DASHBOARD_ENDPOINT'],
);
*/

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
        cls: 0.0023,
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
          <Gauge max={1} min={0} value={cls} />
        </li>
        <li>First contentful paint p75: {fcp}ms</li>
        <li>Interaction to next paint p75: {inp}ms</li>
        <li>Largest contentful paint p75: {lcp}ms</li>
        <li>Loading time p75: {lt}ms</li>
      </ul>
    </section>
  );
}
