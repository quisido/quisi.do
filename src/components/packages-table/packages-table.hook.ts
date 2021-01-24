import { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { PaginationProps } from '@awsui/components-react/pagination';
import { TableProps } from '@awsui/components-react/table';
import { TextFilterProps } from '@awsui/components-react/text-filter';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import {
  useCollectionPreferences,
  usePagination,
  useTable,
  useTextFilter,
} from 'use-awsui';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import useTableItemDescription from '../../hooks/use-table-item-description';
import PackageDescription from './components/package-description';
import useColumnDefinitions from './hooks/use-column-definitions';
import Item from './types/item';
import filterDefaultPackage from './utils/filter-default-package';
import mapDataEntryToItem from './utils/map-data-entry-to-item';

interface State {
  cancelLabel: string;
  collectionPreferencesTitle: string;
  columnDefinitions: TableProps.ColumnDefinition<Item>[];
  confirmLabel: string;
  countText: string;
  currentPageIndex: number;
  filteringAriaLabel?: string;
  filteringPlaceholder: string;
  filteringText: string;
  items: Item[];
  loading: boolean;
  loadingText: string;
  pageSizePreference: CollectionPreferencesProps.PageSizePreference;
  pagesCount: number;
  preferences: CollectionPreferencesProps.Preferences;
  ref: MutableRefObject<HTMLDivElement | null>;
  sortingColumn?: TableProps.SortingColumn<Item>;
  sortingDescending?: boolean;
  visibleContent?: readonly string[];
  visibleContentPreference: CollectionPreferencesProps.VisibleContentPreference;
  wrapLines?: boolean;
  wrapLinesPreference: CollectionPreferencesProps.WrapLinesPreference;
  handleCollectionPreferencesConfirm(
    event: NonCancelableCustomEvent<
      CollectionPreferencesProps.Preferences<void>
    >,
  ): void;
  handlePaginationChange(
    event: NonCancelableCustomEvent<PaginationProps.ChangeDetail>,
  ): void;
  handleSortingChange(
    event: NonCancelableCustomEvent<TableProps.SortingState<Item>>,
  ): void;
  handleTextFilterChange(
    event: NonCancelableCustomEvent<TextFilterProps.ChangeDetail>,
  ): void;
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_VISIBLE_CONTENT: string[] = ['packageName', 'totalDownloads'];
const PAGE_SIZES: number[] = [5, 10, 20, 50];

export default function usePackagesTable(): State {
  const { data, isLoading } = useNpmDownloads();
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const translate: TranslateFunction = useTranslate();

  const {
    handleConfirm: handleCollectionPreferencesConfirm,
    pageSize,
    preferences,
    visibleContent,
    wrapLines,
  } = useCollectionPreferences({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultVisibleContent: DEFAULT_VISIBLE_CONTENT,
  });

  const {
    currentPageIndex,
    handleChange: handlePaginationChange,
    paginate,
  } = usePagination({
    pageSize,
  });

  const {
    handleSortingChange,
    sort,
    sortingColumn,
    sortingDescending,
  } = useTable({
    defaultSortingColumn: {
      sortingField: 'totalDownloads',
    },
    defaultSortingDescending: true,
  });

  const {
    filteringText,
    handleChange: handleTextFilterChange,
  } = useTextFilter();

  const columnDefinitions: TableProps.ColumnDefinition<Item>[] = useColumnDefinitions(
    {
      filteringText,
    },
  );

  const items: Item[] = useMemo((): Item[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const entries: [string, number[]][] = Object.entries(data);
    return entries.map(mapDataEntryToItem).filter(filterDefaultPackage);
  }, [data]);

  const filter = useCallback(
    ({ packageName }: Item): boolean => {
      return packageName.indexOf(filteringText) !== -1;
    },
    [filteringText],
  );

  const filteredItems: Item[] = useMemo((): Item[] => {
    return items.filter(filter);
  }, [filter, items]);

  const visibleItems: Item[] = useMemo((): Item[] => {
    const newVisibleItems: Item[] = [...filteredItems];
    newVisibleItems.sort(sort);
    return paginate(newVisibleItems);
  }, [filteredItems, paginate, sort]);

  const mapNumberToPageSizeOption = useCallback(
    (value: number): CollectionPreferencesProps.PageSizeOption => ({
      label: translate('$count packages', { count: value }) || value.toString(),
      value,
    }),
    [translate],
  );

  useTableItemDescription({
    Component: PackageDescription,
    items: visibleItems,
    ref,
    visibleContentCount: (visibleContent || DEFAULT_VISIBLE_CONTENT).length,
  });

  const filteredItemsCount: number = filteredItems.length;
  return {
    cancelLabel: translate('Cancel') || '...',
    collectionPreferencesTitle: translate('Preferences') || '...',
    columnDefinitions,
    confirmLabel: translate('Confirm') || '...',
    currentPageIndex,
    filteringAriaLabel: translate('Filter packages') || undefined,
    filteringPlaceholder: translate('Filter packages') || '...',
    filteringText,
    handleCollectionPreferencesConfirm,
    handlePaginationChange,
    handleSortingChange,
    handleTextFilterChange,
    items: visibleItems,
    loading: isLoading,
    loadingText: translate('Loading packages') || '...',
    pagesCount: Math.ceil(items.length / (pageSize || DEFAULT_PAGE_SIZE)),
    preferences,
    ref,
    sortingColumn,
    sortingDescending,
    visibleContent,
    wrapLines,
    countText: useMemo((): string => {
      if (filteredItemsCount === 0) {
        return translate('No matches') || '...';
      }
      if (filteredItemsCount === 1) {
        return translate('1 match') || '...';
      }
      return (
        translate('$count matches', { count: filteredItemsCount }) || '...'
      );
    }, [filteredItemsCount, translate]),
    pageSizePreference: useMemo(
      (): CollectionPreferencesProps.PageSizePreference => ({
        title: translate('Select page size.') || '...',
        options: PAGE_SIZES.map(mapNumberToPageSizeOption),
      }),
      [mapNumberToPageSizeOption, translate],
    ),
    visibleContentPreference: useMemo(
      (): CollectionPreferencesProps.VisibleContentPreference => ({
        title: translate('Select visible columns.') || '...',
        options: [
          {
            label: translate('Package properties') || '...',
            options: [
              {
                id: 'packageName',
                label: translate('Package name') || '...',
              },
              {
                id: 'totalDownloads',
                label: translate('Total downloads') || '...',
              },
              {
                id: 'explicitDownloads',
                label: translate('Explicit downloads') || '...',
              },
            ],
          },
        ],
      }),
      [translate],
    ),
    wrapLinesPreference: useMemo(
      (): CollectionPreferencesProps.WrapLinesPreference => ({
        description:
          translate('Select to wrap lines and see all text.') || '...',
        label: translate('Wrap lines') || '...',
      }),
      [translate],
    ),
  };
}
