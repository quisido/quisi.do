import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { MutableRefObject } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import leftPad from '../../../../utils/left-pad';
import sortNumbers from '../../../../utils/sort-numbers';
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
  readonly width: number;
}

interface TimeSeriesDatum {
  readonly timestamp: number;
  readonly value: number;
}

const HALF = 0.5;
const INITIAL_WIDTH = 640;
const NONE = 0;
const PERCENT = 100;

export default function useApdexLineChart({
  frustrated,
  satisfied,
  tolerated,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [width, setWidth] = useState(INITIAL_WIDTH);

  const months: readonly string[] = useMemo(
    (): readonly string[] => [
      translate('Jan.') ?? 'Jan.',
      translate('Feb.') ?? 'Feb.',
      translate('Mar.') ?? 'Mar.',
      translate('Apr.') ?? 'Apr.',
      translate('May') ?? 'May',
      translate('June') ?? 'June',
      translate('July') ?? 'July',
      translate('Aug.') ?? 'Aug.',
      translate('Sep.') ?? 'Sep.',
      translate('Oct.') ?? 'Oct.',
      translate('Nov.') ?? 'Nov.',
      translate('Dec.') ?? 'Dec.',
    ],
    [translate],
  );

  // Callbacks
  const handleResize = useCallback((): void => {
    if (ref.current === null) {
      return;
    }
    setWidth(ref.current.clientWidth);
  }, []);

  const mapTimestampToDateTime = useCallback(
    (timestamp: number): string => {
      const date: Date = new Date(timestamp);
      const day: number = date.getDate();
      const hours: number = date.getHours();
      const minutes: number = date.getMinutes();
      const month: number = date.getMonth();
      return `${months[month]} ${day}, ${leftPad(hours)}:${leftPad(minutes)}`;
    },
    [months],
  );

  // Effects
  useLayoutEffect((): void => {
    handleResize();
  }, [handleResize]);

  useEffect((): VoidFunction | undefined => {
    if (ref.current === null) {
      return;
    }

    const target: HTMLDivElement = ref.current;
    const observer: ResizeObserver = new ResizeObserver(handleResize);
    observer.observe(target);
    return (): void => {
      observer.unobserve(target);
    };
  }, [handleResize]);

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
