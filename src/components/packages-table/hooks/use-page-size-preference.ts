import { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

const PAGE_SIZES: number[] = [5, 10, 20, 50];

export default function usePageSizePreference(): CollectionPreferencesProps.PageSizePreference {
  const translate: TranslateFunction = useTranslate();

  return useMemo((): CollectionPreferencesProps.PageSizePreference => {
    const mapNumberToPageSizeOption = (
      value: number,
    ): CollectionPreferencesProps.PageSizeOption => ({
      label: translate('$count packages', { count: value }) || value.toString(),
      value,
    });

    return {
      title: translate('Select page size.') || '...',
      options: PAGE_SIZES.map(mapNumberToPageSizeOption),
    };
  }, [translate]);
}
