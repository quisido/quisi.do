import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import Table from '../../../../components/table';
import type CloudflareAnalyticsDatasets from '../../../../types/cloudflare-analytics-datasets';
import CLOUDFLARE_ANALYTICS_COLUMNS from '../../constants/cloudflare-analytics-columns';
import type CloudflareAnalytic from '../../types/cloudflare-analytic';
import mapBudgetToPercentage from './utils/map-budget-to-percentage';

interface Props {
  readonly budget: number;
  readonly datasets: CloudflareAnalyticsDatasets | null;
  readonly error: string | null;
  readonly initiated: boolean;
  readonly loading: boolean;
}

const PERCENT = 100;

export default function CloudflareAnalytics({
  budget,
  datasets,
  error,
  initiated,
  loading,
}: Readonly<Props>): ReactElement {
  const translate: TranslateFunction = useTranslate();
  if (!initiated) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <I18n>Initiating</I18n>
      </Container>
    );
  }

  if (error !== null) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <Span element="p">{error}</Span>
      </Container>
    );
  }

  // Technical debt: `datasets` should never be null since it's a state machine.
  if (loading || datasets === null) {
    return (
      <Container header={<I18n>Errors</I18n>} marginTop="large">
        <LoadingIcon /> <I18n>Loading Cloudflare analytics</I18n>
      </Container>
    );
  }

  const {
    rumPageloadEventsAdaptiveGroups,
    rumPerformanceEventsAdaptiveGroups,
    workersAnalyticsEngineAdaptiveGroups,
    workersInvocationsAdaptive,
  } = datasets;
  return (
    <>
      <Container header="Cloudflare analytics" marginTop="large">
        <Div element="p">
          Remaining budget: {mapBudgetToPercentage(budget)}%
        </Div>
        <Div>
          RUM pageload events - sum of visits:{' '}
          {rumPageloadEventsAdaptiveGroups['visits.sum']}
        </Div>
        <Div>
          RUM performance events - count:{' '}
          {rumPerformanceEventsAdaptiveGroups.count}
        </Div>
        <Div>
          RUM performance events - average sample interval:{' '}
          {rumPerformanceEventsAdaptiveGroups['sampleInterval.avg']}
        </Div>
        <Div>
          RUM performance events - sum of visits:{' '}
          {rumPerformanceEventsAdaptiveGroups['visits.sum']}
        </Div>
        <Div>
          Workers analytics engine - count:{' '}
          {workersAnalyticsEngineAdaptiveGroups.count}
        </Div>
        <Div>
          Workers invocations - sum of errors:{' '}
          {workersInvocationsAdaptive['errors.sum']} (
          {(workersInvocationsAdaptive['errors.sum'] /
            workersInvocationsAdaptive['requests.sum']) *
            PERCENT}
          %)
        </Div>
        <Div>
          Workers invocations - sum of requests:{' '}
          {workersInvocationsAdaptive['requests.sum']}
        </Div>
        <Div>
          Workers invocations - average sample interval:{' '}
          {workersInvocationsAdaptive['sampleInterval.avg']}
        </Div>
        <Div>
          Workers invocations - sum of subrequests:{' '}
          {workersInvocationsAdaptive['subrequests.sum']}
        </Div>
      </Container>

      <Table<CloudflareAnalytic>
        columns={CLOUDFLARE_ANALYTICS_COLUMNS}
        filter=""
        onFilterChange={(): void => {}}
        onPageChange={(): void => {}}
        onRowsPerPageChange={(): void => {}}
        onSort={(): void => {}}
        onVisibleColumnsChange={(): void => {}}
        page={1}
        rows={[
          {
            avg: rumPerformanceEventsAdaptiveGroups['connectionTime.avg'],
            name: translate('Connection time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.connectionTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.connectionTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.connectionTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.connectionTimeP99,
          },
          {
            max: workersInvocationsAdaptive['cpuTime.max'],
            min: workersInvocationsAdaptive['cpuTime.min'],
            name: translate('CPU time') || '...',
            p25: workersInvocationsAdaptive.cpuTimeP25,
            p50: workersInvocationsAdaptive.cpuTimeP50,
            p75: workersInvocationsAdaptive.cpuTimeP75,
            p90: workersInvocationsAdaptive.cpuTimeP90,
            p99: workersInvocationsAdaptive.cpuTimeP99,
            p999: workersInvocationsAdaptive.cpuTimeP999,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['dnsTime.avg'],
            name: translate('DNS time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.dnsTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.dnsTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.dnsTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.dnsTimeP99,
          },
          {
            max: workersInvocationsAdaptive['duration.max'],
            min: workersInvocationsAdaptive['duration.min'],
            name: translate('Duration') || '...',
            p25: workersInvocationsAdaptive.durationP25,
            p50: workersInvocationsAdaptive.durationP50,
            p75: workersInvocationsAdaptive.durationP75,
            p90: workersInvocationsAdaptive.durationP90,
            p99: workersInvocationsAdaptive.durationP99,
            p999: workersInvocationsAdaptive.durationP999,
            sum: workersInvocationsAdaptive['duration.sum'],
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['firstContentfulPaint.avg'],
            name: translate('First contentful paint') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP50,
            p75: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP75,
            p90: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP90,
            p99: rumPerformanceEventsAdaptiveGroups.firstContentfulPaintP99,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['firstPaint.avg'],
            name: translate('First paint') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.firstPaintP50,
            p75: rumPerformanceEventsAdaptiveGroups.firstPaintP75,
            p90: rumPerformanceEventsAdaptiveGroups.firstPaintP90,
            p99: rumPerformanceEventsAdaptiveGroups.firstPaintP99,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['loadEventTime.avg'],
            name: translate('Load event time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.loadEventTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.loadEventTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.loadEventTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.loadEventTimeP99,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['pageLoadTime.avg'],
            name: translate('Page load time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.pageLoadTimeP99,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['pageRenderTime.avg'],
            name: translate('Page render time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.pageRenderTimeP99,
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['requestTime.avg'],
            name: translate('Request time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.requestTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.requestTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.requestTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.requestTimeP99,
          },
          {
            max: workersInvocationsAdaptive['responseBodySize.max'],
            min: workersInvocationsAdaptive['responseBodySize.min'],
            name: translate('Response body size') || '...',
            p25: workersInvocationsAdaptive.responseBodySizeP25,
            p50: workersInvocationsAdaptive.responseBodySizeP50,
            p75: workersInvocationsAdaptive.responseBodySizeP75,
            p90: workersInvocationsAdaptive.responseBodySizeP90,
            p99: workersInvocationsAdaptive.responseBodySizeP99,
            p999: workersInvocationsAdaptive.responseBodySizeP999,
            sum: workersInvocationsAdaptive['responseBodySize.sum'],
          },
          {
            avg: rumPerformanceEventsAdaptiveGroups['responseTime.avg'],
            name: translate('Response time') || '...',
            p50: rumPerformanceEventsAdaptiveGroups.responseTimeP50,
            p75: rumPerformanceEventsAdaptiveGroups.responseTimeP75,
            p90: rumPerformanceEventsAdaptiveGroups.responseTimeP90,
            p99: rumPerformanceEventsAdaptiveGroups.responseTimeP99,
          },
          {
            max: workersInvocationsAdaptive['wallTime.max'],
            min: workersInvocationsAdaptive['wallTime.min'],
            name: translate('Wall time') || '...',
            p25: workersInvocationsAdaptive.wallTimeP25,
            p50: workersInvocationsAdaptive.wallTimeP50,
            p75: workersInvocationsAdaptive.wallTimeP75,
            p90: workersInvocationsAdaptive.wallTimeP90,
            p99: workersInvocationsAdaptive.wallTimeP99,
            p999: workersInvocationsAdaptive.wallTimeP999,
            sum: workersInvocationsAdaptive['wallTime.sum'],
          },
        ]}
        rowsCount={1}
        rowsPerPage={1}
        rowsPerPageOptions={[]}
        sortAscending
        visibleColumnIndices={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      />
    </>
  );
}
