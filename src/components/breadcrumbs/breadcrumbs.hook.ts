import type { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useBreadcrumbGroup } from 'use-awsui-router';

interface State {
  readonly ariaLabel: string | undefined;
  readonly items: BreadcrumbGroupProps.Item[];
  readonly handleFollow: (
    event: Readonly<
      CustomEvent<
        Readonly<
          BreadcrumbGroupProps.ClickDetail<Readonly<BreadcrumbGroupProps.Item>>
        >
      >
    >,
  ) => void;
}

const DEFAULT_ITEMS: BreadcrumbGroupProps.Item[] = [
  {
    text: 'CharlesStover.com',
    href: '/',
  },
];

export default function useBreadcrumbs(
  breadcrumbs: readonly Readonly<BreadcrumbGroupProps.Item>[],
): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { handleFollow } = useBreadcrumbGroup();

  return {
    ariaLabel: translate('Breadcrumbs'),
    handleFollow,

    items: useMemo(
      (): BreadcrumbGroupProps.Item[] => [...DEFAULT_ITEMS, ...breadcrumbs],
      [breadcrumbs],
    ),
  };
}
