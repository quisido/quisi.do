import { useEffect, type ReactElement } from 'react';
import useAsyncState from '../modules/use-async-state/index.js';
import validateString from '../utils/validate-string.js';

const DASHBOARD_ENDPOINT: string = validateString(
  process.env['DASHBOARD_ENDPOINT'],
);

export default function PleasantnessDashboard(): ReactElement {
  const { data, error, initiated, loading, request } = useAsyncState();

  useEffect((): void => {
    void request(async (): Promise<unknown> => {
      const response: Response = await window.fetch(DASHBOARD_ENDPOINT);
      return await response.json();
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

  return (
    <section>
      <h3>Pleasantness</h3>
      <ul>
        <li>Cumulative layout shift p75: {data.cls}</li>
        <li>First contentful paint p75: {data.fcp}ms</li>
        <li>Interaction to next paint p75: {data.inp}ms</li>
        <li>Largest contentful paint p75: {data.lcp}ms</li>
        <li>Loading time p75: {data.lt}ms</li>
      </ul>
    </section>
  );
}
