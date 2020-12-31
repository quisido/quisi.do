import { AlertProps } from '@awsui/components-react/alert';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { PieChartProps } from '@awsui/components-react/pie-chart';
import { ChartDetailPair } from '@awsui/components-react/pie-chart/interfaces';
import { TableProps } from '@awsui/components-react/table';
import { ToggleProps } from '@awsui/components-react/toggle';
import { MutableRefObject, useCallback, useMemo } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import { useQuery } from 'react-query';
import PACKAGE_DEPENDENCIES from '../../constants/package-dependencies';
import useTable from '../../hooks/use-table';
import useToggle from '../../hooks/use-toggle';
import mapUnknownToString from '../../utils/map-unknown-to-string';
import PackageDescription from './components/package-description';
import DEFAULT_COLUMN_DEFINITIONS from './constants/default-column-definitions';
import Item from './types/item';
import filterItemsByMinimumTotalDownloads from './utils/filter-items-by-minimum-total-downloads';
import mapDataEntryToItem from './utils/map-data-entry-to-item';
import reduceArrayOfArraysToSum from './utils/reduce-array-of-arrays-to-sum';

interface State {
  columnDefinitions: TableProps.ColumnDefinition<Item>[];
  detailPopoverContent: PieChartProps<Item>['detailPopoverContent'];
  filter: TableProps['filter'];
  handleAlertDismiss: AlertProps['onDismiss'];
  handleColumnWidthsChange: TableProps['onColumnWidthsChange'];
  handleRowClick: TableProps['onRowClick'];
  handleSortingChange: TableProps['onSortingChange'];
  handleUniqueDownloadsChange: ToggleProps['onChange'];
  handleVisualizationChange: ToggleProps['onChange'];
  innerMetricValue: string;
  isAlertVisible: AlertProps['visible'];
  isLoading: boolean;
  isUniqueDownloads: ToggleProps['checked'];
  isVisualization: ToggleProps['checked'];
  items: Item[];
  notifications: FlashbarProps.MessageDefinition[];
  ref: MutableRefObject<HTMLDivElement | null>;
  segmentDescription: PieChartProps<Item>['segmentDescription'];
  sortingColumn: TableProps['sortingColumn'];
  sortingDescending: TableProps['sortingDescending'];
}

const EN_US_NUMBER_FORMAT: Intl.NumberFormat = Intl.NumberFormat('en-US');

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> = new ReactCapsule<boolean>(
  true,
);

export default function usePackages(): State {
  const [isAlertVisible, setIsAlertVisible] = useCapsule(
    IS_ALERT_VISIBLE_CAPSULE,
  );

  const { data, error, isLoading, refetch } = useQuery(
    'npm',
    async (): Promise<Record<string, number[]>> => {
      const response: Response = await fetch(
        process.env.REACT_APP_NPM_DOWNLOADS ||
          'https://npm.cscdn.net/charlesstover.json',
      );
      return await response.json();
    },
  );

  const {
    checked: isUniqueDownloads,
    handleChange: handleUniqueDownloadsChange,
  } = useToggle({
    defaultChecked: false,
  });
  const {
    checked: isVisualization,
    handleChange: handleVisualizationChange,
  } = useToggle({
    defaultChecked: false,
  });

  //
  //
  // Memos
  //
  //
  const defaultItems: Item[] = useMemo((): Item[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const reduceDataToItems = (
      items: Item[],
      [packageName, downloads]: [string, number[]],
      _index: number,
      entries: [string, number[]][],
    ): Item[] => {
      const item: Item = mapDataEntryToItem([packageName, downloads], entries);
      return [
        ...items,
        {
          ...item,
          value: isUniqueDownloads ? item.uniqueDownloads : item.totalDownloads,
        },
      ];
    };
    const entries: [string, number[]][] = Object.entries(data);
    const items: Item[] = entries.reduce(reduceDataToItems, []);
    return items.filter(filterItemsByMinimumTotalDownloads);
  }, [data, isUniqueDownloads]);

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

  const {
    columnDefinitions,
    filter,
    handleColumnWidthsChange,
    handleRowClick,
    handleSortingChange,
    items,
    ref,
    sortingColumn,
    sortingDescending,
  } = useTable({
    DescriptionComponent: PackageDescription,
    defaultColumnDefinitions: DEFAULT_COLUMN_DEFINITIONS,
    defaultItems,
    defaultSortingColumn: {
      sortingField: 'totalDownloads',
    },
    defaultSortingDescending: true,
    filteringFunction({ packageName }: Item, filteringText: string): boolean {
      return packageName.indexOf(filteringText) !== -1;
    },
    filteringAriaLabel: 'Filter packages',
    filteringPlaceholder: 'Filter packages',
    filteringTextProp: true,
  });

  //
  //
  // Callbacks
  //
  //
  const handleAlertDismiss = useCallback((): void => {
    setIsAlertVisible(false);
  }, [setIsAlertVisible]);

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

  return {
    columnDefinitions,
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
          key: 'Unique downloads',
          value: EN_US_NUMBER_FORMAT.format(uniqueDownloads),
        },
        {
          key: 'Total downloads (%)',
          value: `${totalDownloadsPercent}%`,
        },
        {
          key: 'Unique downloads (%)',
          value: `${uniqueDownloadsPercent}%`,
        },
      ];
    },
    filter,
    handleAlertDismiss,
    handleColumnWidthsChange,
    handleRowClick,
    handleSortingChange,
    handleUniqueDownloadsChange,
    handleVisualizationChange,
    innerMetricValue: EN_US_NUMBER_FORMAT.format(totalDownloads),
    isAlertVisible,
    isLoading,
    isUniqueDownloads,
    isVisualization,
    items,
    notifications,
    ref,
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
    sortingColumn,
    sortingDescending,
  };
}
