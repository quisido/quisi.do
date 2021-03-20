import { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { PaginationProps } from '@awsui/components-react/pagination';
import { TableProps } from '@awsui/components-react/table';
import { TextFilterProps } from '@awsui/components-react/text-filter';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { MutableRefObject, useMemo, useRef } from 'react';
import {
  useCollectionPreferences,
  usePagination,
  useTable,
  useTextFilter,
} from 'use-awsui';
import useAwsuiTableItemDescription from 'use-awsui-table-item-description';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import PackageDescription from './components/package-description';
import useColumnDefinitions from './hooks/use-column-definitions';
import useCountText from './hooks/use-count-text';
import usePageSizePreference from './hooks/use-page-size-preference';
import useVisibleContentPreference from './hooks/use-visible-content-preference';
import useWrapLinesPreference from './hooks/use-wrap-lines-preference';
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

export default function usePackagesTable(): State {
  // Contexts
  const { data, isLoading } = useNpmDownloads();
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const translate: TranslateFunction = useTranslate();

  // States
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

  const items: Item[] = useMemo((): Item[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const entries: [string, number[]][] = Object.entries(data);
    return entries.map(mapDataEntryToItem).filter(filterDefaultPackage);
  }, [data]);

  const filteredItems: Item[] = useMemo((): Item[] => {
    const filter = ({ packageName }: Item): boolean => {
      return packageName.indexOf(filteringText) !== -1;
    };

    return items.filter(filter);
  }, [filteringText, items]);

  const visibleItems: Item[] = useMemo((): Item[] => {
    const newVisibleItems: Item[] = [...filteredItems];
    newVisibleItems.sort(sort);
    return paginate(newVisibleItems);
  }, [filteredItems, paginate, sort]);

  useAwsuiTableItemDescription({
    Component: PackageDescription,
    colSpan: (visibleContent || DEFAULT_VISIBLE_CONTENT).length,
    items: visibleItems,
    ref,
  });

  const filteredItemsCount: number = filteredItems.length;
  return {
    cancelLabel: translate('Cancel') || '...',
    collectionPreferencesTitle: translate('Preferences') || '...',
    confirmLabel: translate('Confirm') || '...',
    countText: useCountText(filteredItemsCount),
    currentPageIndex,
    filteringAriaLabel: translate('Filter packages'),
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
    pageSizePreference: usePageSizePreference(),
    preferences,
    ref,
    sortingColumn,
    sortingDescending,
    visibleContent,
    visibleContentPreference: useVisibleContentPreference(),
    wrapLines,
    wrapLinesPreference: useWrapLinesPreference(),

    columnDefinitions: useColumnDefinitions({
      filteringText,
    }),
  };
}
