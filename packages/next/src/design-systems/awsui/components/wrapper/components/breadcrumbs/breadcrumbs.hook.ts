'use client';

import { type BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useBreadcrumbGroup } from 'use-next-awsui';
import type Breadcrumb from '../../../../../../types/breadcrumb';
import mapBreadcrumbsToBreadcrumbGroupItems from '../../utils/map-breadcrumbs-to-breadcrumb-group-items';
import mapBreadcrumbToPath from '../../../../../../utils/map-breadcrumb-to-path';

interface State {
  readonly ariaLabel: string | undefined;
  readonly items: readonly BreadcrumbGroupProps.Item[];
  readonly handleFollow: (
    event: CustomEvent<
      BreadcrumbGroupProps.ClickDetail<BreadcrumbGroupProps.Item>
    >,
  ) => void;
}

export default function useAwsuiWrapperBreadcrumbs(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const paths: ReadonlySet<string> = useMemo(
    (): ReadonlySet<string> => new Set(breadcrumbs.map(mapBreadcrumbToPath)),
    [breadcrumbs],
  );

  const { handleFollow } = useBreadcrumbGroup(paths);

  return {
    ariaLabel: translate('Breadcrumbs'),
    handleFollow,

    items: useMemo(
      (): readonly BreadcrumbGroupProps.Item[] =>
        mapBreadcrumbsToBreadcrumbGroupItems(breadcrumbs),
      [breadcrumbs],
    ),
  };
}
