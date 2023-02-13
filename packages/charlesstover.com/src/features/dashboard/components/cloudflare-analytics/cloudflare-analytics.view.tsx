import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Div from '../../../../components/div';
import LoadingIcon from '../../../../components/loading-icon';
import Span from '../../../../components/span';
import type CloudflareAnalyticsDatasets from '../../../../types/cloudflare-analytics-datasets';
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

  return (
    <Container header="Cloudflare analytics" marginTop="large">
      <Div element="p">Remaining budget: {mapBudgetToPercentage(budget)}%</Div>
      <Div>
        RUM pageload events - sum of visits:{' '}
        {datasets.rumPageloadEventsAdaptiveGroups['visits.sum']}
      </Div>
      <Div>
        RUM performance events - count:{' '}
        {datasets.rumPerformanceEventsAdaptiveGroups.count}
      </Div>
      <Div>
        RUM performance events - average sample interval:{' '}
        {datasets.rumPerformanceEventsAdaptiveGroups['sampleInterval.avg']}
      </Div>
      <Div>
        RUM performance events - sum of visits:{' '}
        {datasets.rumPerformanceEventsAdaptiveGroups['visits.sum']}
      </Div>
      <Div>
        Workers analytics engine - count:{' '}
        {datasets.workersAnalyticsEngineAdaptiveGroups.count}
      </Div>
      <Div>
        Workers invocations - sum of errors:{' '}
        {datasets.workersInvocationsAdaptive['errors.sum']} (
        {(datasets.workersInvocationsAdaptive['errors.sum'] /
          datasets.workersInvocationsAdaptive['requests.sum']) *
          PERCENT}
        %)
      </Div>
      <Div>
        Workers invocations - sum of requests:{' '}
        {datasets.workersInvocationsAdaptive['requests.sum']}
      </Div>
      <Div>
        Workers invocations - average sample interval:{' '}
        {datasets.workersInvocationsAdaptive['sampleInterval.avg']}
      </Div>
      <Div>
        Workers invocations - sum of subrequests:{' '}
        {datasets.workersInvocationsAdaptive['subrequests.sum']}
      </Div>
      <table cellPadding={4}>
        <thead>
          <tr>
            <td></td>
            <th>Average</th>
            <th>P50</th>
            <th>P75</th>
            <th>P90</th>
            <th>P99</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Connection time</th>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups[
                  'connectionTime.avg'
                ]
              }
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.connectionTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.connectionTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.connectionTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.connectionTimeP99}
            </td>
          </tr>
          <tr>
            <th>DNS time</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['dnsTime.avg']}
            </td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.dnsTimeP50}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.dnsTimeP75}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.dnsTimeP90}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.dnsTimeP99}</td>
          </tr>
          <tr>
            <th>First contentful paint</th>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups[
                  'firstContentfulPaint.avg'
                ]
              }
            </td>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups
                  .firstContentfulPaintP50
              }
            </td>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups
                  .firstContentfulPaintP75
              }
            </td>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups
                  .firstContentfulPaintP90
              }
            </td>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups
                  .firstContentfulPaintP99
              }
            </td>
          </tr>
          <tr>
            <th>First paint</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['firstPaint.avg']}
            </td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.firstPaintP50}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.firstPaintP75}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.firstPaintP90}</td>
            <td>{datasets.rumPerformanceEventsAdaptiveGroups.firstPaintP99}</td>
          </tr>
          <tr>
            <th>Load event time</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['loadEventTime.avg']}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.loadEventTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.loadEventTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.loadEventTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.loadEventTimeP99}
            </td>
          </tr>
          <tr>
            <th>Page load time</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['pageLoadTime.avg']}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageLoadTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageLoadTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageLoadTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageLoadTimeP99}
            </td>
          </tr>
          <tr>
            <th>Page render time</th>
            <td>
              {
                datasets.rumPerformanceEventsAdaptiveGroups[
                  'pageRenderTime.avg'
                ]
              }
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageRenderTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageRenderTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageRenderTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.pageRenderTimeP99}
            </td>
          </tr>
          <tr>
            <th>Request time</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['requestTime.avg']}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.requestTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.requestTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.requestTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.requestTimeP99}
            </td>
          </tr>
          <tr>
            <th>Response time</th>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups['responseTime.avg']}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.responseTimeP50}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.responseTimeP75}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.responseTimeP90}
            </td>
            <td>
              {datasets.rumPerformanceEventsAdaptiveGroups.responseTimeP99}
            </td>
          </tr>
        </tbody>
      </table>

      <table cellPadding={4}>
        <thead>
          <tr>
            <td></td>
            <th>Minimum</th>
            <th>P25</th>
            <th>P50</th>
            <th>P75</th>
            <th>P90</th>
            <th>P99</th>
            <th>P99.9</th>
            <th>Maximum</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>CPU time</th>
            <td>{datasets.workersInvocationsAdaptive['cpuTime.min']}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP25}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP50}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP75}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP90}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP99}</td>
            <td>{datasets.workersInvocationsAdaptive.cpuTimeP999}</td>
            <td>{datasets.workersInvocationsAdaptive['cpuTime.max']}</td>
            <td></td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{datasets.workersInvocationsAdaptive['duration.min']}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP25}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP50}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP75}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP90}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP99}</td>
            <td>{datasets.workersInvocationsAdaptive.durationP999}</td>
            <td>{datasets.workersInvocationsAdaptive['duration.max']}</td>
            <td>{datasets.workersInvocationsAdaptive['duration.sum']}</td>
          </tr>
          <tr>
            <th>Response body size</th>
            <td>
              {datasets.workersInvocationsAdaptive['responseBodySize.min']}
            </td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP25}</td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP50}</td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP75}</td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP90}</td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP99}</td>
            <td>{datasets.workersInvocationsAdaptive.responseBodySizeP999}</td>
            <td>
              {datasets.workersInvocationsAdaptive['responseBodySize.max']}
            </td>
            <td>
              {datasets.workersInvocationsAdaptive['responseBodySize.sum']}
            </td>
          </tr>
          <tr>
            <th>Wall time</th>
            <td>{datasets.workersInvocationsAdaptive['wallTime.min']}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP25}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP50}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP75}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP90}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP99}</td>
            <td>{datasets.workersInvocationsAdaptive.wallTimeP999}</td>
            <td>{datasets.workersInvocationsAdaptive['wallTime.max']}</td>
            <td>{datasets.workersInvocationsAdaptive['wallTime.sum']}</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
