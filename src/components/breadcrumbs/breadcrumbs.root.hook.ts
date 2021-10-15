import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';

const DEFAULT_BREADCRUMBS: readonly Breadcrumb[] = Object.freeze([
  {
    children: 'CharlesStover.com',
    path: '/',
  },
]);

export default function useBreadcrumbs(
  children: readonly Readonly<Breadcrumb>[],
): readonly Breadcrumb[] {
  return useMemo((): readonly Breadcrumb[] => {
    return [...DEFAULT_BREADCRUMBS, ...children];
  }, [children]);
}
