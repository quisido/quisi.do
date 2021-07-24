import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

const NONE = 0;
const SINGLE = 1;

export default function usePackagesCountText(count: number): string {
  const translate: TranslateFunction = useTranslate();

  return useMemo((): string => {
    if (count === NONE) {
      return translate('No matches') ?? '...';
    }
    if (count === SINGLE) {
      return translate('1 match') ?? '...';
    }
    return translate('$count matches', { count }) ?? '...';
  }, [count, translate]);
}
