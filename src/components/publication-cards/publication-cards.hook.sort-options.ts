import { SelectProps } from '@awsui/components-react/select';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import PublicationCardsSort from '../../constants/publication-cards-sort';

export default function usePublicationCardsSortOptions(): SelectProps.Options {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): SelectProps.Options => [
      {
        label: translate('Publication date') || '...',
        value: PublicationCardsSort.PublicationDate,
      },
      {
        label: translate('Reactions') || '...',
        value: PublicationCardsSort.Reactions,
      },
      {
        label: translate('Reactions per day') || '...',
        value: PublicationCardsSort.ReactionsPerDay,
      },
      {
        label: translate('Reactions per view') || '...',
        value: PublicationCardsSort.ReactionsPerView,
      },
      {
        label: translate('Reading time') || '...',
        value: PublicationCardsSort.ReadingTime,
      },
      {
        label: translate('Views') || '...',
        value: PublicationCardsSort.Views,
      },
      {
        label: translate('Views per day') || '...',
        value: PublicationCardsSort.ViewsPerDay,
      },
    ],
    [translate],
  );
}
