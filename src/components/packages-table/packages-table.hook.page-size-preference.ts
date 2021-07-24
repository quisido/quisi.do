import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const PAGE_SIZES: number[] = [5, 10, 20, 50];

export default function usePageSizePreference(): CollectionPreferencesProps.PageSizePreference {
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
