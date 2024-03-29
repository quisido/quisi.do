import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useTableSort from '../../../../../../hooks/use-table-sort.js';
import type Invocations from '../../../../../../types/cloudflare-workers-invocations.js';
import round from '../../../../../../utils/round.js';
import type Analytic from '../../types/workers-invocations-analytic.js';
import mapSampleIntervalToRate from '../../map-sample-interval-to-rate.js';

interface State {
  readonly handleSort: (columnIndex: number, ascending: boolean) => void;
  readonly rows: readonly Analytic[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex: number;
  readonly subheader: string;
}

const DECIMALS = 2;
const PERCENT = 100;

export default function useWorkersInvocations({
  cpuTime_max,
  cpuTime_min,
  cpuTimeP25,
  cpuTimeP50,
  cpuTimeP75,
  cpuTimeP90,
  cpuTimeP99,
  cpuTimeP999,
  duration_max,
  duration_min,
  duration_sum,
  durationP25,
  durationP50,
  durationP75,
  durationP90,
  durationP99,
  durationP999,
  errors_sum,
  requests_sum,
  responseBodySize_max,
  responseBodySize_min,
  responseBodySize_sum,
  responseBodySizeP25,
  responseBodySizeP50,
  responseBodySizeP75,
  responseBodySizeP90,
  responseBodySizeP99,
  responseBodySizeP999,
  sampleInterval_avg,
  subrequests_sum,
  wallTime_max,
  wallTime_min,
  wallTime_sum,
  wallTimeP25,
  wallTimeP50,
  wallTimeP75,
  wallTimeP90,
  wallTimeP99,
  wallTimeP999,
}: Readonly<Invocations>): State {
  const sampleRate: number = mapSampleIntervalToRate(sampleInterval_avg);

  const errorRate: number = round(
    (errors_sum / requests_sum) * PERCENT,
    DECIMALS,
  );

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
    subheader: [
      `${errorRate}% error rate`,
      `${errors_sum} errors`,
      `${requests_sum} requests`,
      `${sampleRate}% sample rate`,
      `${subrequests_sum} subrequests`,
    ].join(' • '),

    rows: useMemo(
      (): readonly Analytic[] => [
        {
          goal: 'low',
          max: cpuTime_max,
          min: cpuTime_min,
          name: translate('CPU time') ?? '...',
          p25: cpuTimeP25,
          p50: cpuTimeP50,
          p75: cpuTimeP75,
          p90: cpuTimeP90,
          p99: cpuTimeP99,
          p999: cpuTimeP999,
          unit: 'microseconds',
        },
        {
          goal: 'low',
          max: duration_max,
          min: duration_min,
          name: translate('Duration') ?? '...',
          p25: durationP25,
          p50: durationP50,
          p75: durationP75,
          p90: durationP90,
          p99: durationP99,
          p999: durationP999,
          sum: duration_sum,
          unit: 'seconds',
        },
        {
          max: responseBodySize_max,
          min: responseBodySize_min,
          name: translate('Response body size') ?? '...',
          p25: responseBodySizeP25,
          p50: responseBodySizeP50,
          p75: responseBodySizeP75,
          p90: responseBodySizeP90,
          p99: responseBodySizeP99,
          p999: responseBodySizeP999,
          sum: responseBodySize_sum,
          unit: 'bytes',
        },
        {
          goal: 'low',
          max: wallTime_max,
          min: wallTime_min,
          name: translate('Wall time') ?? '...',
          p25: wallTimeP25,
          p50: wallTimeP50,
          p75: wallTimeP75,
          p90: wallTimeP90,
          p99: wallTimeP99,
          p999: wallTimeP999,
          sum: wallTime_sum,
          unit: 'microseconds',
        },
      ],
      [
        cpuTime_max,
        cpuTime_min,
        cpuTimeP25,
        cpuTimeP50,
        cpuTimeP75,
        cpuTimeP90,
        cpuTimeP99,
        cpuTimeP999,
        duration_max,
        duration_min,
        duration_sum,
        durationP25,
        durationP50,
        durationP75,
        durationP90,
        durationP99,
        durationP999,
        responseBodySize_max,
        responseBodySize_min,
        responseBodySize_sum,
        responseBodySizeP25,
        responseBodySizeP50,
        responseBodySizeP75,
        responseBodySizeP90,
        responseBodySizeP99,
        responseBodySizeP999,
        translate,
        wallTime_max,
        wallTime_min,
        wallTime_sum,
        wallTimeP25,
        wallTimeP50,
        wallTimeP75,
        wallTimeP90,
        wallTimeP99,
        wallTimeP999,
      ],
    ),
  };
}
