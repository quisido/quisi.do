import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { MutableRefObject } from 'react';
import { useCallback, useMemo } from 'react';
import useElementWidth from '../../../../hooks/use-element-width';
import sortNumbers from '../../../../utils/sort-numbers';
import useTimestampFormatter from '../../hooks/use-timestamp-formatter';
import type TimeSeriesDatum from '../../types/time-series-datum';
import mapStringToInt from '../../utils/map-string-to-int';

interface Props {
  readonly errorCount: Record<string, number>;
  readonly sessionCount: Record<string, number>;
}

interface State {
  readonly data: TimeSeriesDatum[];
  readonly formatter: (rate: string) => [string, string];
  readonly labelFormatter: (timestamp: number) => string;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly tickFormatter: (timestamp: number) => string;
  readonly width: number | undefined;
}

const NONE = 0;
const PERCENT = 100;

export default function useErrorRate({
  errorCount,
  sessionCount,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const mapTimestampToDateTime = useTimestampFormatter();

  return {
    labelFormatter: mapTimestampToDateTime,
    ref,
    tickFormatter: mapTimestampToDateTime,
    width,

    data: useMemo((): TimeSeriesDatum[] => {
      const mapTimestampToErrorRate = (timestamp: number): number => {
        const sessions: number = sessionCount[timestamp] ?? NONE;
        if (sessions === NONE) {
          return NONE;
        }
        const errors: number = errorCount[timestamp] ?? NONE;
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

      const timestamps: readonly number[] = Object.keys(sessionCount)
        .map(mapStringToInt)
        .sort(sortNumbers);
      return timestamps.reduce(reduceTimestampsToErrorRates, []);
    }, [errorCount, sessionCount]),

    formatter: useCallback(
      (rate: string): [string, string] => [
        `${rate}%`,
        translate('Error rate') ?? '...',
      ],
      [translate],
    ),
  };
}
