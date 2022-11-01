import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useBreadcrumbGroup } from 'use-awsui-router';
import type Breadcrumb from '../../../../types/breadcrumb';
import mapBreadcrumbsToCloudscapeBreadcrumbGroupItems from '../../utils/map-breadcrumbs-to-cloudscape-breadcrumb-group-items';

interface State {
  readonly ariaLabel: string | undefined;
  readonly items: readonly BreadcrumbGroupProps.Item[];
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

export default function useCloudscapeWrapperBreadcrumbs(
  breadcrumbs: readonly Readonly<Breadcrumb>[],
): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { handleFollow } = useBreadcrumbGroup();

  return {
    ariaLabel: translate('Breadcrumbs'),
    handleFollow,

    items: useMemo((): readonly BreadcrumbGroupProps.Item[] => {
      return mapBreadcrumbsToCloudscapeBreadcrumbGroupItems(breadcrumbs);
    }, [breadcrumbs]),
  };
}
