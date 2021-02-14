import { SelectProps } from '@awsui/components-react/select';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import Sort from '../constants/sort';

export default function useSortOptions(): SelectProps.Options {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): SelectProps.Options => [
      {
        label: translate('Publication date') || '...',
        value: Sort.PublicationDate,
      },
      {
        label: translate('Reactions') || '...',
        value: Sort.Reactions,
      },
      {
        label: translate('Reactions per day') || '...',
        value: Sort.ReactionsPerDay,
      },
      {
        label: translate('Reactions per view') || '...',
        value: Sort.ReactionsPerView,
      },
      {
        label: translate('Reading time') || '...',
        value: Sort.ReadingTime,
      },
      {
        label: translate('Views') || '...',
        value: Sort.Views,
      },
      {
        label: translate('Views per day') || '...',
        value: Sort.ViewsPerDay,
      },
    ],
    [translate],
  );
}
