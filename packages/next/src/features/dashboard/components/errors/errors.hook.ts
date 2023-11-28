import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { type MutableRefObject, useCallback, useMemo } from 'react';
import useElementWidth from '../../../../hooks/use-element-width.js';
import sortNumbers from '../../../../utils/sort-numbers.js';
import useTimestampFormatter from '../../hooks/use-timestamp-formatter.js';
import type TimeSeriesDatum from '../../types/time-series-datum.js';
import mapRecordToSum from '../../utils/map-record-to-sum.js';
import mapStringToInt from '../../utils/map-string-to-int.js';

interface Props {
  readonly errorCountTimeSeries: Record<string, number | undefined>;
  readonly sessionCountTimeSeries: Record<string, number | undefined>;
}

interface State {
  readonly data: TimeSeriesDatum[];
  readonly errorCount: number;
  readonly formatter: (rate: string) => [string, string];
  readonly labelFormatter: (timestamp: number) => string;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly tickFormatter: (timestamp: number) => string;
  readonly width: number | undefined;
}

const NONE = 0;
const PERCENT = 100;

export default function useErrors({
  errorCountTimeSeries,
  sessionCountTimeSeries,
}: Props): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const mapTimestampToDateTime = useTimestampFormatter();

  return {
    errorCount: mapRecordToSum(errorCountTimeSeries),
    labelFormatter: mapTimestampToDateTime,
    ref,
    tickFormatter: mapTimestampToDateTime,
    width,

    data: useMemo((): TimeSeriesDatum[] => {
      const mapTimestampToErrorRate = (timestamp: number): number => {
        const sessions: number = sessionCountTimeSeries[timestamp] ?? NONE;
        if (sessions === NONE) {
          return NONE;
        }
        const errors: number = errorCountTimeSeries[timestamp] ?? NONE;
        return (errors / sessions) * PERCENT;
      };

      const reduceTimestampsToErrorRates = (
        newData: TimeSeriesDatum[],
        timestamp: number,
      ): TimeSeriesDatum[] => [
        ...newData,
        {
          timestamp,
          value: mapTimestampToErrorRate(timestamp),
        },
      ];

      const timestamps: readonly number[] = Object.keys(sessionCountTimeSeries)
        .map(mapStringToInt)
        .sort(sortNumbers);
      return timestamps.reduce(reduceTimestampsToErrorRates, []);
    }, [errorCountTimeSeries, sessionCountTimeSeries]),

    formatter: useCallback(
      (rate: string): [string, string] => [
        `${rate}%`,
        translate('Error rate') ?? '...',
      ],
      [translate],
    ),
  };
}
