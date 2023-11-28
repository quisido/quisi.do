import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useTableSort from '../../../../../../hooks/use-table-sort';
import type RumPerformanceEvents from '../../../../../../types/cloudflare-rum-performance-events';
import type Analytic from '../../types/web-analytic';
import mapSampleIntervalToRate from '../../map-sample-interval-to-rate';

interface State {
  readonly handleSort: (columnIndex: number, ascending: boolean) => void;
  readonly rows: readonly Analytic[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex: number;
  readonly subheader: string;
}

export default function useCloudflareWebAnalytics({
  connectionTime_avg,
  connectionTimeP50,
  connectionTimeP75,
  connectionTimeP90,
  connectionTimeP99,
  count,
  dnsTime_avg,
  dnsTimeP50,
  dnsTimeP75,
  dnsTimeP90,
  dnsTimeP99,
  firstContentfulPaint_avg,
  firstContentfulPaintP50,
  firstContentfulPaintP75,
  firstContentfulPaintP90,
  firstContentfulPaintP99,
  firstPaint_avg,
  firstPaintP50,
  firstPaintP75,
  firstPaintP90,
  firstPaintP99,
  loadEventTime_avg,
  loadEventTimeP50,
  loadEventTimeP75,
  loadEventTimeP90,
  loadEventTimeP99,
  requestTimeP50,
  requestTimeP75,
  requestTimeP90,
  requestTimeP99,
  requestTime_avg,
  responseTime_avg,
  responseTimeP50,
  responseTimeP75,
  responseTimeP90,
  responseTimeP99,
  pageLoadTime_avg,
  pageLoadTimeP50,
  pageLoadTimeP75,
  pageLoadTimeP90,
  pageLoadTimeP99,
  pageRenderTime_avg,
  pageRenderTimeP50,
  pageRenderTimeP75,
  pageRenderTimeP90,
  pageRenderTimeP99,
  sampleInterval_avg,
  visits_sum,
}: Readonly<RumPerformanceEvents>): State {
  const subheaders: string[] = [];
  if (typeof count === 'number') {
    subheaders.push(`${count} events`);
  }

  if (typeof sampleInterval_avg === 'number') {
    const sampleRate: number = mapSampleIntervalToRate(sampleInterval_avg);
    subheaders.push(`${sampleRate}% sample rate`);
  }

  if (typeof visits_sum === 'number') {
    subheaders.push(`${visits_sum} visits`);
  }

  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const {
    ascending: sortAscending,
    columnIndex: sortColumnIndex,
    handleSort,
  } = useTableSort();

  return {
    handleSort,
    sortAscending,
    sortColumnIndex,
    subheader: subheaders.join(' • '),

    rows: useMemo(
      (): readonly Analytic[] => [
        {
          avg: firstContentfulPaint_avg,
          goal: 'low',
          name: translate('First contentful paint') ?? '...',
          p50: firstContentfulPaintP50,
          p75: firstContentfulPaintP75,
          p90: firstContentfulPaintP90,
          p99: firstContentfulPaintP99,
          unit: 'microseconds',
        },
        {
          avg: firstPaint_avg,
          goal: 'low',
          name: translate('First paint') ?? '...',
          p50: firstPaintP50,
          p75: firstPaintP75,
          p90: firstPaintP90,
          p99: firstPaintP99,
          unit: 'microseconds',
        },
        {
          avg: loadEventTime_avg,
          goal: 'low',
          name: translate('Load event time') ?? '...',
          p50: loadEventTimeP50,
          p75: loadEventTimeP75,
          p90: loadEventTimeP90,
          p99: loadEventTimeP99,
          unit: 'milliseconds',
        },
        {
          avg: pageLoadTime_avg,
          goal: 'low',
          name: translate('Page load time') ?? '...',
          p50: pageLoadTimeP50,
          p75: pageLoadTimeP75,
          p90: pageLoadTimeP90,
          p99: pageLoadTimeP99,
          unit: 'microseconds',
        },
        {
          avg: pageRenderTime_avg,
          goal: 'low',
          name: translate('Page render time') ?? '...',
          p50: pageRenderTimeP50,
          p75: pageRenderTimeP75,
          p90: pageRenderTimeP90,
          p99: pageRenderTimeP99,
          unit: 'microseconds',
        },
        {
          avg: requestTime_avg,
          goal: 'low',
          name: translate('Request time') ?? '...',
          p50: requestTimeP50,
          p75: requestTimeP75,
          p90: requestTimeP90,
          p99: requestTimeP99,
          unit: 'microseconds',
        },
        {
          avg: responseTime_avg,
          goal: 'low',
          name: translate('Response time') ?? '...',
          p50: responseTimeP50,
          p75: responseTimeP75,
          p90: responseTimeP90,
          p99: responseTimeP99,
          unit: 'milliseconds',
        },
        {
          avg: connectionTime_avg,
          goal: 'low',
          name: translate('User connection time') ?? '...',
          p50: connectionTimeP50,
          p75: connectionTimeP75,
          p90: connectionTimeP90,
          p99: connectionTimeP99,
          unit: 'milliseconds',
        },
        {
          avg: dnsTime_avg,
          goal: 'low',
          name: translate('User DNS time') ?? '...',
          p50: dnsTimeP50,
          p75: dnsTimeP75,
          p90: dnsTimeP90,
          p99: dnsTimeP99,
          unit: 'microseconds',
        },
      ],
      [
        connectionTime_avg,
        connectionTimeP50,
        connectionTimeP75,
        connectionTimeP90,
        connectionTimeP99,
        dnsTime_avg,
        dnsTimeP50,
        dnsTimeP75,
        dnsTimeP90,
        dnsTimeP99,
        firstContentfulPaint_avg,
        firstContentfulPaintP50,
        firstContentfulPaintP75,
        firstContentfulPaintP90,
        firstContentfulPaintP99,
        firstPaint_avg,
        firstPaintP50,
        firstPaintP75,
        firstPaintP90,
        firstPaintP99,
        loadEventTime_avg,
        loadEventTimeP50,
        loadEventTimeP75,
        loadEventTimeP90,
        loadEventTimeP99,
        requestTimeP50,
        requestTimeP75,
        requestTimeP90,
        requestTimeP99,
        requestTime_avg,
        responseTime_avg,
        responseTimeP50,
        responseTimeP75,
        responseTimeP90,
        responseTimeP99,
        pageLoadTime_avg,
        pageLoadTimeP50,
        pageLoadTimeP75,
        pageLoadTimeP90,
        pageLoadTimeP99,
        pageRenderTime_avg,
        pageRenderTimeP50,
        pageRenderTimeP75,
        pageRenderTimeP90,
        pageRenderTimeP99,
        translate,
      ],
    ),
  };
}
