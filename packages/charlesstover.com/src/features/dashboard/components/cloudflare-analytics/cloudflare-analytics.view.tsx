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
      </Container>
      <WebAnalytics>{rumPerformanceEventsAdaptiveGroups}</WebAnalytics>
      <WorkersInvocations>{workersInvocationsAdaptive}</WorkersInvocations>
    </>
  );
}

export default withAsync(Uninitiated, Loading, ErrorView, CloudflareAnalytics);
