import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import Table from '../../../../components/table';
import withAsync from '../../../../hocs/with-async';
import type Datasets from '../../../../types/cloudflare-analytics-datasets';
import createIndexArray from '../../../../utils/create-index-array';
import ANALYTICS_COLUMNS from './constants/analytics-columns';
import type CloudflareAnalytic from '../../types/cloudflare-analytic';
import ErrorView from './components/error';
import Loading from './components/loading';
import Uninitiated from './components/uninitiated';
import WorkersInvocations from './components/workers-invocations';
import mapBudgetToPercentage from './utils/map-budget-to-percentage';
import useTableSort from '../../../../hooks/use-table-sort';

interface Props {
  readonly budget: number;
  readonly datasets: Datasets;
}

const COLUMNS_LENGTH: number = ANALYTICS_COLUMNS.length;
const PERCENT = 100;
const VISIBLE_COLUMN_INDICES: readonly number[] =
  createIndexArray(COLUMNS_LENGTH);

function CloudflareAnalytics({
  budget,
  datasets,
}: Readonly<Props>): ReactElement {
  const {
    rumPageloadEventsAdaptiveGroups,
    rumPerformanceEventsAdaptiveGroups,
    workersAnalyticsEngineAdaptiveGroups,
    workersInvocationsAdaptive,
  } = datasets;

  // States
  const translate: TranslateFunction = useTranslate();
  const { ascending, columnIndex, handleSort } = useTableSort();
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
          Remaining budget: {mapBudgetToPercentage(budget)}%
        </Div>
        <Div>
          RUM pageload events - sum of visits:{' '}
          {rumPageloadEventsAdaptiveGroups.visits_sum}
        </Div>
        <Div>
          RUM performance events - count:{' '}
          {rumPerformanceEventsAdaptiveGroups.count}
        </Div>
        <Div>
          RUM performance events - average sample interval:{' '}
          {rumPerformanceEventsAdaptiveGroups.sampleInterval_avg}
        </Div>
        <Div>
          RUM performance events - sum of visits:{' '}
          {rumPerformanceEventsAdaptiveGroups.visits_sum}
        </Div>
        <Div>
          Workers analytics engine - count:{' '}
          {workersAnalyticsEngineAdaptiveGroups.count}
        </Div>
        <Div>
          Workers invocations - sum of errors:{' '}
          {workersInvocationsAdaptive.errors_sum} (
          {(workersInvocationsAdaptive.errors_sum /
            workersInvocationsAdaptive.requests_sum) *
            PERCENT}
          %)
        </Div>
        <Div>
          Workers invocations - sum of requests:{' '}
          {workersInvocationsAdaptive.requests_sum}
        </Div>
        <Div>
          Workers invocations - average sample interval:{' '}
          {workersInvocationsAdaptive.sampleInterval_avg}
        </Div>
        <Div>
          Workers invocations - sum of subrequests:{' '}
          {workersInvocationsAdaptive.subrequests_sum}
        </Div>
      </Container>
      <Table<CloudflareAnalytic>
        columns={ANALYTICS_COLUMNS}
        header={<I18n>Cloudflare Web Analytics</I18n>}
        onSort={handleSort}
        rows={[
          {
            avg: rumPerformanceEventsAdaptiveGroups.connectionTime_avg,
            name: translate('User connection time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.connectionTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.connectionTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.connectionTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.connectionTimeP99,
            unit: 'milliseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.dnsTime_avg,
            name: translate('User DNS time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.dnsTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.dnsTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.dnsTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.dnsTimeP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.firstContentfulPaint_avg,
            name: translate('First contentful paint') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP50,
            p75: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP75,
            p90: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP90,
            p99: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.firstPaint_avg,
            name: translate('First paint') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.firstPaintP50,
            p75: rumPerformanceEventsAdaptiveGroups.firstPaintP75,
            p90: rumPerformanceEventsAdaptiveGroups.firstPaintP90,
            p99: rumPerformanceEventsAdaptiveGroups.firstPaintP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.loadEventTime_avg,
            name: translate('Load event time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.loadEventTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.loadEventTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.loadEventTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.loadEventTimeP99,
            unit: 'milliseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.pageLoadTime_avg,
            name: translate('Page load time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.pageRenderTime_avg,
            name: translate('Page render time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.requestTime_avg,
            name: translate('Request time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.requestTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.requestTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.requestTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.requestTimeP99,
            unit: 'microseconds',
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups.responseTime_avg,
            name: translate('Response time') ?? '...',
            p50: rumPerformanceEventsAdaptiveGroups.responseTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.responseTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.responseTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.responseTimeP99,
            unit: 'milliseconds',
          },
        ]}
        rowsCount={1}
        rowsPerPage={1}
        sortAscending={ascending}
        sortColumnIndex={columnIndex}
        visibleColumnIndices={VISIBLE_COLUMN_INDICES}
      />
      <WorkersInvocations>{workersInvocationsAdaptive}</WorkersInvocations>
    </>
  );
}

export default withAsync(Uninitiated, Loading, ErrorView, CloudflareAnalytics);
