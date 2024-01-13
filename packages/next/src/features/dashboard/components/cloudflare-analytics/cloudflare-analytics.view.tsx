import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Div from '../../../../components/div/index.js';
import Gauge from '../../../../components/gauge/index.js';
import Quantity from '../../../../components/quantity/index.js';
import Section from '../../../../components/section.js';
import withAsync from '../../../../hocs/with-async.js';
import type Datasets from '../../../../types/cloudflare-analytics-datasets.js';
import ErrorView from './components/error/index.js';
import Loading from './components/loading/index.js';
import SampleInterval from './components/sample-interval/index.js';
import Uninitiated from './components/uninitiated/index.js';
import WebAnalytics from './components/web-analytics.js';
import WorkersInvocations from './components/workers-invocations.js';
import mapBudgetToPercentage from './utils/map-budget-to-percentage.js';

interface Props {
  readonly budget: number;
  readonly datasets: Datasets;
}

interface ClientSslMapSum {
  readonly key: string;
  readonly requests: number;
}

const SIZE_PER_VALUE = 50;
const ZERO = 0;

const reduceClientSslMapSumToMax = (
  max: number,
  { requests }: ClientSslMapSum,
): number => Math.max(max, requests);

const reduceClientSslMapSumToRecord = (
  record: Record<string, number>,
  { key, requests }: ClientSslMapSum,
): Record<string, number> => ({
  ...record,
  [key]: requests,
});

function CloudflareAnalytics({ budget, datasets }: Props): ReactElement {
  const {
    httpRequests1hGroups,
    rumPageloadEventsAdaptiveGroups,
    rumPerformanceEventsAdaptiveGroups,
    workersAnalyticsEngineAdaptiveGroups,
    workersInvocationsAdaptive,
  } = datasets;

  // States
  // const sortColumn: TableColumn<CloudflareAnalytic> | undefined =
  //   CLOUDFLARE_ANALYTICS_COLUMNS[columnIndex];
  // if (typeof sortColumn !== 'undefined') {
  //   rows.sort(sortColumn.sort);

  //   if (!deferredSortAscending) {
  //     rows.reverse();
  //   }
  // }

  return (
    <>
      <Section header={<I18n>Cloudflare analytics</I18n>}>
        <Div element="p">
          <strong>Remaining budget:</strong> {mapBudgetToPercentage(budget)}%
        </Div>

        <Gauge
          max={httpRequests1hGroups.clientSSLMap_sum.reduce(
            reduceClientSslMapSumToMax,
            ZERO,
          )}
          size={httpRequests1hGroups.clientSSLMap_sum.length * SIZE_PER_VALUE}
          values={httpRequests1hGroups.clientSSLMap_sum.reduce(
            reduceClientSslMapSumToRecord,
            {},
          )}
        />

        <Div>
          <strong>HTTP requests:</strong>
          <ul>
            <li>
              <Quantity decimals={2} unit="bytes">
                {httpRequests1hGroups.bytes_sum}
              </Quantity>
            </li>
            <li>
              <Quantity decimals={2} unit="bytes">
                {httpRequests1hGroups.cachedBytes_sum}
              </Quantity>{' '}
              cached
            </li>
            <li>
              {httpRequests1hGroups.cachedRequests_sum.toLocaleString()}{' '}
              requests cached
            </li>
            <li>
              <Quantity decimals={2} unit="bytes">
                {httpRequests1hGroups.encryptedBytes_sum}
              </Quantity>{' '}
              encrypted
            </li>
            <li>
              {httpRequests1hGroups.encryptedRequests_sum.toLocaleString()}{' '}
              requests encrypted
            </li>
            <li>
              {httpRequests1hGroups.pageViews_sum.toLocaleString()} page views
            </li>
            <li>
              {httpRequests1hGroups.requests_sum.toLocaleString()} requests
            </li>
            <li>{httpRequests1hGroups.threats_sum.toLocaleString()} threats</li>
            <li>
              {httpRequests1hGroups.uniques_uniq.toLocaleString()} unique
              visitors
            </li>
          </ul>
        </Div>

        <Div>
          <strong>RUM pageload events:</strong>
          <ul>
            <li>{rumPageloadEventsAdaptiveGroups.count} events</li>
            <li>
              <SampleInterval>
                {rumPageloadEventsAdaptiveGroups.sampleInterval_avg}
              </SampleInterval>
            </li>
            <li>{rumPageloadEventsAdaptiveGroups.visits_sum} visits</li>
          </ul>
        </Div>

        <Div element="p">
          <strong>Workers analytics engine:</strong>{' '}
          {workersAnalyticsEngineAdaptiveGroups.count}
        </Div>
      </Section>
      <WebAnalytics>{rumPerformanceEventsAdaptiveGroups}</WebAnalytics>
      <WorkersInvocations>{workersInvocationsAdaptive}</WorkersInvocations>
    </>
  );
}

export default withAsync(Uninitiated, Loading, ErrorView, CloudflareAnalytics);
