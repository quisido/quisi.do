import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';

interface State {
  readonly breadcrumbs: readonly Breadcrumb[];
}

export default function usePublications(): State {
  const translate: TranslateFunction = useTranslate();

  return {
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
