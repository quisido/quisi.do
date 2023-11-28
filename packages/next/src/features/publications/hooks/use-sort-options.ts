import type SelectOption from '../../../types/select-option';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import Sort from '../constants/publications-sort';

export default function usePublicationsSortOptions(): readonly SelectOption[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): readonly SelectOption[] => [
      {
        label: translate('Daily reactions') ?? '...',
        value: Sort.ReactionsPerDay,
      },
      {
        label: translate('Daily views') ?? '...',
        value: Sort.ViewsPerDay,
      },
      {
        label: translate('Engagement rate') ?? '...',
        value: Sort.ReactionsPerView,
      },
      {
        label: translate('Publication date') ?? '...',
        value: Sort.PublicationDate,
      },
      {
        label: translate('Reactions') ?? '...',
        value: Sort.Reactions,
      },
      {
        label: translate('Reading time') ?? '...',
        value: Sort.ReadingTime,
      },
      {
        label: translate('Views') ?? '...',
        value: Sort.Views,
      },
    ],
    [translate],
  );
}
