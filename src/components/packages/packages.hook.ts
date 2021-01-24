import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { ToggleProps } from '@awsui/components-react/toggle';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import { useToggle } from 'use-awsui';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import mapUnknownToString from '../../utils/map-unknown-to-string';
import reduceArrayOfArraysToSum from './utils/reduce-array-of-arrays-to-sum';

interface State {
  breadcrumbs: BreadcrumbGroupProps.Item[];
  // detailPopoverContent: PieChartProps<Item>['detailPopoverContent'];
  handleExplicitDownloadsChange: ToggleProps['onChange'];
  innerMetricValue: string;
  isExplicitDownloads: ToggleProps['checked'];
  isLoading: boolean;
  // items: Item[];
  notifications: FlashbarProps.MessageDefinition[];
  // segmentDescription: PieChartProps<Item>['segmentDescription'];
}

const EN_US_NUMBER_FORMAT: Intl.NumberFormat = Intl.NumberFormat('en-US');

export default function usePackages(): State {
  const { data, error, isLoading, refetch } = useNpmDownloads();
  const translate: TranslateFunction = useTranslate();

  const {
    checked: isExplicitDownloads,
    handleChange: handleExplicitDownloadsChange,
  } = useToggle({
    defaultChecked: false,
  });

  //
  //
  // Memos
  //
  //

  const notifications: FlashbarProps.MessageDefinition[] = useMemo((): FlashbarProps.MessageDefinition[] => {
    const newNotifications: FlashbarProps.MessageDefinition[] = [];
    if (error !== null) {
      newNotifications.push({
        content: mapUnknownToString(error),
        buttonText: 'Retry',
        dismissible: true,
        header: 'An error occurred.',
        onButtonClick(): void {
          refetch();
        },
        type: 'error',
      });
    }
    return newNotifications;
  }, [error, refetch]);

  const totalDownloads: number = useMemo((): number => {
    if (typeof data === 'undefined') {
      return 0;
    }
    return Object.values(data).reduce(reduceArrayOfArraysToSum, 0);
  }, [data]);

  /*
  const totalUniqueDownloads: number = useMemo((): number => {
    let newTotalUniqueDownloads: number = totalDownloads;
    for (const dependencies of PACKAGE_DEPENDENCIES.values()) {
      for (const dependency of dependencies) {
        const findDependencyItem = (dependencyItem: Item): boolean =>
          dependencyItem.packageName === dependency;
        const dependencyItem: Item | undefined = items.find(findDependencyItem);
        if (typeof dependencyItem === 'undefined') {
          continue;
        }
        newTotalUniqueDownloads -= dependencyItem.uniqueDownloads;
      }
    }
    return newTotalUniqueDownloads;
  }, [items, totalDownloads]);
  */

  return {
    breadcrumbs: useMemo(
      (): BreadcrumbGroupProps.Item[] => [
        {
          href: '/packages',
          text: translate('Packages') || '...',
        },
      ],
      [translate],
    ),
    /*
    detailPopoverContent({
      totalDownloads: itemTotalDownloads,
      uniqueDownloads,
    }: Item): ChartDetailPair[] {
      const totalDownloadsPercent: number =
        Math.round((itemTotalDownloads / totalDownloads) * 10000) / 100;
      const uniqueDownloadsPercent: number =
        Math.round((uniqueDownloads / totalUniqueDownloads) * 10000) / 100;
      return [
        {
          key: 'Total downloads',
          value: EN_US_NUMBER_FORMAT.format(itemTotalDownloads),
        },
        {
          key: 'Explicit downloads',
          value: EN_US_NUMBER_FORMAT.format(uniqueDownloads),
        },
        {
          key: 'Total downloads (%)',
          value: `${totalDownloadsPercent}%`,
        },
        {
          key: 'Explicit downloads (%)',
          value: `${uniqueDownloadsPercent}%`,
        },
      ];
    },
    */
    handleExplicitDownloadsChange,
    innerMetricValue: EN_US_NUMBER_FORMAT.format(totalDownloads),
    isExplicitDownloads,
    isLoading,
    notifications,
    /*
    segmentDescription({
      totalDownloads: itemTotalDownloads,
      uniqueDownloads,
    }: Item): string {
      if (isUniqueDownloads) {
        return `${
          Math.round((uniqueDownloads / totalUniqueDownloads) * 10000) / 100
        }%`;
      }
      return `${
        Math.round((itemTotalDownloads / totalDownloads) * 10000) / 100
      }%`;
    },
    */
  };
}
