import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useCallback, useMemo } from 'react';
import leftPad from '../../../utils/left-pad.js';

export default function useTimestampFormatter(): (timestamp: number) => string {
  // Contexts
  const translate: TranslateFunction = useTranslate();

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
  return useCallback(
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
}
