import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

const BASE_PAGE_SIZE = 5;
const MULTIPLIER = 2;
const SQUARED = 2;

// 5, 10, 20, 50
const PAGE_SIZES: number[] = [
  BASE_PAGE_SIZE,
  BASE_PAGE_SIZE * MULTIPLIER,
  BASE_PAGE_SIZE * Math.pow(MULTIPLIER, SQUARED),
  Math.pow(BASE_PAGE_SIZE, SQUARED) * MULTIPLIER,
];

export default function usePackagesPageSizePreference(): CollectionPreferencesProps.PageSizePreference {
  const translate: TranslateFunction = useTranslate();

  return useMemo((): CollectionPreferencesProps.PageSizePreference => {
    const mapNumberToPageSizeOption = (
      value: number,
    ): CollectionPreferencesProps.PageSizeOption => ({
      label: translate('$count packages', { count: value }) ?? value.toString(),
      value,
    });

    return {
      title: translate('Select page size.') ?? '...',
      options: PAGE_SIZES.map(mapNumberToPageSizeOption),
    };
  }, [translate]);
}
