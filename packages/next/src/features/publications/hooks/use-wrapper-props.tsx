import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type Breadcrumb from '../../../types/breadcrumb';
import type { Props as WrapperProps } from '../../../components/wrapper';

export default function usePublicationsWrapperProps(): Omit<
  WrapperProps,
  'children'
> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  return {
    fallback: <I18n>Loading publications</I18n>,
    toolsHide: true,

    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Publications') ?? '...',
          path: '/publications',
        },
      ],
      [translate],
    ),
  };
}
