import type { MutableRefObject } from 'react';
import { useMemo } from 'react';
import useElementWidth from '../../../../hooks/use-element-width';
import sortNumbers from '../../../../utils/sort-numbers';
import useTimestampFormatter from '../../hooks/use-timestamp-formatter';
import type TimeSeriesDatum from '../../types/time-series-datum';
import mapStringToInt from '../../utils/map-string-to-int';

interface Props {
  readonly frustrated: Record<string, number | undefined>;
  readonly satisfied: Record<string, number | undefined>;
  readonly tolerated: Record<string, number | undefined>;
}

interface State {
  readonly data: TimeSeriesDatum[];
  readonly labelFormatter: (timestamp: number) => string;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly tickFormatter: (timestamp: number) => string;
  readonly width: number | undefined;
}

const HALF = 0.5;
const NONE = 0;
const PERCENT = 100;

export default function useApdexLineChart({
  frustrated,
  satisfied,
  tolerated,
}: Readonly<Props>): State {
  // States
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const mapTimestampToDateTime = useTimestampFormatter();

  return {
    ref,
    labelFormatter: mapTimestampToDateTime,
    tickFormatter: mapTimestampToDateTime,
    width,

    data: useMemo((): TimeSeriesDatum[] => {
      const timestamps: readonly number[] = [
        ...Object.keys(frustrated),
        ...Object.keys(satisfied),
        ...Object.keys(tolerated),
      ].map(mapStringToInt);

      const partialXAxis: readonly number[] = [...new Set(timestamps)].sort(
        sortNumbers,
      );

      const mapTimestampToScore = (timestamp: number): number => {
        const frustratedCount: number = frustrated[timestamp] ?? NONE;
        const satisfiedCount: number = satisfied[timestamp] ?? NONE;
        const toleratedCount: number = tolerated[timestamp] ?? NONE;
        const total: number = frustratedCount + satisfiedCount + toleratedCount;
        if (total === NONE) {
          throw new Error(
            `Cannot generate an Apdex score for missing timestamp: ${timestamp}`,
          );
        }
        return ((satisfiedCount + toleratedCount * HALF) / total) * PERCENT;
      };

      const mapTimestampToDatum = (timestamp: number): TimeSeriesDatum => {
        // If an Apdex score exists for this timestamp, return it.
        return {
          timestamp,
          value: mapTimestampToScore(timestamp),
        };
      };

      return partialXAxis.map(mapTimestampToDatum);
    }, [frustrated, satisfied, tolerated]),
  };
}
