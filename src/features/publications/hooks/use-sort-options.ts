import type SelectOption from '../../../types/select-option';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import Sort from '../constants/publications-sort';

export default function usePublicationsSortOptions(): readonly SelectOption[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): readonly SelectOption[] => [
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
