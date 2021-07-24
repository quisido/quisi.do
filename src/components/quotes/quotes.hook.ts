import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

interface State {
  readonly breadcrumbs: readonly BreadcrumbGroupProps.Item[];
}

export default function useQuotes(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    breadcrumbs: useMemo(
      (): readonly BreadcrumbGroupProps.Item[] => [
        {
          href: '/quotes',
          text: translate('Quotes') ?? '...',
        },
      ],
      [translate],
    ),
  };
}
