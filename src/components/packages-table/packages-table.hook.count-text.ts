import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

export default function useCountText(count: number): string {
  const translate: TranslateFunction = useTranslate();

  return useMemo((): string => {
    if (count === 0) {
      return translate('No matches') || '...';
    }
    if (count === 1) {
      return translate('1 match') || '...';
    }
    return translate('$count matches', { count }) || '...';
  }, [count, translate]);
}
