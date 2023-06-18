import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type { Props as WrapperProps } from '../../../components/wrapper';
import type Breadcrumb from '../../../types/breadcrumb';

export default function useWrapperProps(): Partial<WrapperProps> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    fallback: <I18n>Loading dashboard</I18n>,
    toolsHide: true,

    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Dashboard') ?? '...',
          path: '/dashboard',
        },
      ],
      [translate],
    ),
  };
}
