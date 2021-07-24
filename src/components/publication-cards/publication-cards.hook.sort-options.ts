import type { SelectProps } from '@awsui/components-react/select';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import Sort from './publication-cards.constant.sort';

export default function usePublicationCardsSortOptions(): SelectProps.Options {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): SelectProps.Options => [
      {
        label: translate('Publication date') ?? '...',
        value: Sort.PublicationDate,
      },
      {
        label: translate('Reactions') ?? '...',
        value: Sort.Reactions,
      },
      {
        label: translate('Reactions per day') ?? '...',
        value: Sort.ReactionsPerDay,
      },
      {
        label: translate('Reactions per view') ?? '...',
        value: Sort.ReactionsPerView,
      },
      {
        label: translate('Reading time') ?? '...',
        value: Sort.ReadingTime,
      },
      {
        label: translate('Views') ?? '...',
        value: Sort.Views,
      },
      {
        label: translate('Views per day') ?? '...',
        value: Sort.ViewsPerDay,
      },
    ],
    [translate],
  );
}
