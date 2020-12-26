import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { useMemo } from 'react';
import useReactRouterBreadcrumbs from '../../hooks/use-react-router-breadcrumbs';

interface State {
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
  const { handleFollow } = useReactRouterBreadcrumbs();

  const items: BreadcrumbGroupProps.Item[] = useMemo(
    (): BreadcrumbGroupProps.Item[] => [...DEFAULT_ITEMS, ...breadcrumbs],
    [breadcrumbs],
  );

  return {
    handleFollow,
    items,
  };
}
