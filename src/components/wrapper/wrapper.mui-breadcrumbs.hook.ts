import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { Attributes } from 'react';
import { useMemo } from 'react';
import type Breadcrumb from '../../types/breadcrumb';
import type BreadcrumbProps from './types/mui-breadcrumb-props';

interface State {
  readonly ariaLabel: string | undefined;
  readonly expandText: string | undefined;
  readonly breadcrumbProps: readonly Readonly<
    Required<Attributes> & BreadcrumbProps
  >[];
}

const LAST_INDEX_OFFSET = -1;

export default function useWrapperMuiBreadcrumbs(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): State {
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabel: translate('breadcrumb'),
    expandText: translate('Show path'),

    breadcrumbProps: useMemo((): readonly Readonly<
      Required<Attributes> & BreadcrumbProps
    >[] => {
      const breadcrumbCount: number = breadcrumbs.length;
      const lastIndex: number = breadcrumbCount + LAST_INDEX_OFFSET;

      const mapBreadcrumbToProps = (
        { children, path }: Readonly<Breadcrumb>,
        index: number,
      ): Readonly<Required<Attributes> & BreadcrumbProps> => ({
        children,
        current: index === lastIndex,
        key: path,
        path,
      });

      return breadcrumbs.map(mapBreadcrumbToProps);
    }, [breadcrumbs]),
  };
}
