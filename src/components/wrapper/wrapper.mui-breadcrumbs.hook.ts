import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import type BreadcrumbProps from './types/mui-breadcrumb-props';

interface State {
  readonly ariaLabel: string | undefined;
  readonly expandText: string | undefined;
  readonly breadcrumbProps: readonly Readonly<BreadcrumbProps>[];
}

const LAST_INDEX_OFFSET = -1;

export default function useWrapperMuiBreadcrumbs(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): State {
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabel: translate('breadcrumb'),
    expandText: translate('Show path'),

    breadcrumbProps: useMemo((): readonly Readonly<BreadcrumbProps>[] => {
      const breadcrumbCount: number = breadcrumbs.length;
      const lastIndex: number = breadcrumbCount + LAST_INDEX_OFFSET;

      const mapBreadcrumbToProps = (
        { children, path }: Readonly<Breadcrumb>,
        index: number,
      ): Readonly<BreadcrumbProps> => ({
        children,
        current: index === lastIndex,
        path,
      });

      return breadcrumbs.map(mapBreadcrumbToProps);
    }, [breadcrumbs]),
  };
}
