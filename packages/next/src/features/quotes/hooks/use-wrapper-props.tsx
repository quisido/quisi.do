import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type { Props as WrapperProps } from '../../../components/wrapper';
import type Breadcrumb from '../../../types/breadcrumb';

export default function useQuotesWrapperProps(): Omit<
  WrapperProps,
  'children'
> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  return {
    fallback: <I18n>Loading quotes</I18n>,
    toolsHide: true,

    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Quotes') ?? '...',
          path: '/quotes',
        },
      ],
      [translate],
    ),
  };
}
