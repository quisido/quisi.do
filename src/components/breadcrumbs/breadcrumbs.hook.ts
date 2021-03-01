import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useBreadcrumbGroup } from 'use-awsui-router';

interface State {
  ariaLabel?: string;
  handleFollow: BreadcrumbGroupProps['onFollow'];
  items: BreadcrumbGroupProps.Item[];
}

const DEFAULT_ITEMS: BreadcrumbGroupProps.Item[] = [
  {
    text: 'CharlesStover.com',
    href: '/',
  },
];

export default function useBreadcrumbs(
  breadcrumbs: readonly BreadcrumbGroupProps.Item[],
): State {
  const { handleFollow } = useBreadcrumbGroup();
  const translate: TranslateFunction = useTranslate();

  const items: BreadcrumbGroupProps.Item[] = useMemo(
    (): BreadcrumbGroupProps.Item[] => [...DEFAULT_ITEMS, ...breadcrumbs],
    [breadcrumbs],
  );

  return {
    ariaLabel: translate('Breadcrumbs'),
    handleFollow,
    items,
  };
}
