import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Quantity from '../../../../components/quantity';
import withAsync from '../../../../hocs/with-async';
import type Datasets from '../../../../types/cloudflare-analytics-datasets';
import ErrorView from './components/error';
import Loading from './components/loading';
import Uninitiated from './components/uninitiated';
import WebAnalytics from './components/web-analytics/web-analytics.view';
import WorkersInvocations from './components/workers-invocations';
import mapBudgetToPercentage from './utils/map-budget-to-percentage';
import SampleInterval from './components/sample-interval/sample-interval.view';

interface Props {
  readonly budget: number;
  readonly datasets: Datasets;
}

function CloudflareAnalytics({
  budget,
  datasets,
}: Readonly<Props>): ReactElement {
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
      <Container header={<I18n>Cloudflare analytics</I18n>} marginTop="large">
        <Div element="p">
          <strong>Remaining budget:</strong> {mapBudgetToPercentage(budget)}%
        </Div>

        <Div element="p">
          <strong>HTTP requests:</strong>{' '}
          <Quantity decimals={2} unit="bytes">
            {httpRequests1hGroups.bytes_sum}
          </Quantity>{' '}
          bytes,{' '}
          <Quantity decimals={2} unit="bytes">
            {httpRequests1hGroups.cachedBytes_sum}
          </Quantity>{' '}
          cached bytes, {httpRequests1hGroups.cachedRequests_sum} cached
          requests,{' '}
          <Quantity decimals={2} unit="bytes">
            {httpRequests1hGroups.encryptedBytes_sum}
          </Quantity>{' '}
          encrypted bytes, {httpRequests1hGroups.encryptedRequests_sum}{' '}
          encrypted requests, {httpRequests1hGroups.pageViews_sum} page views,{' '}
          {httpRequests1hGroups.requests_sum} requests,{' '}
          {httpRequests1hGroups.threats_sum} threats,{' '}
          {httpRequests1hGroups.uniques_uniq} unique visitors
        </Div>

        <Div element="p">
          <strong>RUM pageload events:</strong>{' '}
          {rumPageloadEventsAdaptiveGroups.count} events,{' '}
          <SampleInterval>
            {rumPageloadEventsAdaptiveGroups.sampleInterval_avg}
          </SampleInterval>
          , {rumPageloadEventsAdaptiveGroups.visits_sum} visits
        </Div>

        <Div element="p">
          <strong>Workers analytics engine:</strong>{' '}
          {workersAnalyticsEngineAdaptiveGroups.count}
        </Div>
      </Container>
      <WebAnalytics>{rumPerformanceEventsAdaptiveGroups}</WebAnalytics>
      <WorkersInvocations>{workersInvocationsAdaptive}</WorkersInvocations>
    </>
  );
}

export default withAsync(Uninitiated, Loading, ErrorView, CloudflareAnalytics);
