import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';
import type { TableProps } from '@awsui/components-react/table';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { MutableRefObject } from 'react';
import { useMemo, useRef } from 'react';
import {
  useCollectionPreferences,
  usePagination,
  useTable,
  useTextFilter,
} from 'use-awsui';
import useAwsuiTableItemDescription from 'use-awsui-table-item-description';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import type ReadonlyTableSortingEvent from '../../types/readonly-table-sorting-event';
import filterDefaultPackage from './packages.filter.default-package';
import useColumnDefinitions from './packages.hook.column-definitions';
import useCountText from './packages.hook.count-text';
import usePageSizePreference from './packages.hook.page-size-preference';
import useVisibleContentPreference from './packages.hook.visible-content-preference';
import useWrapLinesPreference from './packages.hook.wrap-lines-preference';
import mapNpmDownloadsEntryToItem from './packages.map.npm-downloads-entry-to-item';
import type Item from './packages.type.item';
import PackageDescription from './packages.view.description';

interface State {
  readonly cancelLabel: string;
  readonly collectionPreferencesTitle: string;
  readonly columnDefinitions: readonly TableProps.ColumnDefinition<Item>[];
  readonly confirmLabel: string;
  readonly countText: string;
  readonly currentPageIndex: number;
  readonly filteringAriaLabel: string | undefined;
  readonly filteringPlaceholder: string;
  readonly filteringText: string;
  readonly items: readonly Item[];
  readonly loading: boolean;
  readonly loadingText: string;
  readonly pageSizePreference: CollectionPreferencesProps.PageSizePreference;
  readonly pagesCount: number;
  readonly preferences: CollectionPreferencesProps.Preferences;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly sortingColumn: TableProps.SortingColumn<Item> | undefined;
  readonly sortingDescending: boolean | undefined;
  readonly visibleContent: readonly string[] | undefined;
  readonly visibleContentPreference: CollectionPreferencesProps.VisibleContentPreference;
  readonly wrapLines: boolean | undefined;
  readonly wrapLinesPreference: CollectionPreferencesProps.WrapLinesPreference;
  readonly handleCollectionPreferencesConfirm: (
    event: Readonly<
      NonCancelableCustomEvent<
        Readonly<CollectionPreferencesProps.Preferences<void>>
      >
    >,
  ) => void;
  readonly handlePaginationChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ) => void;
  readonly handleSortingChange: (
    event: ReadonlyTableSortingEvent<Item>,
  ) => void;
  readonly handleTextFilterChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
    >,
  ) => void;
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_VISIBLE_CONTENT: string[] = ['packageName', 'totalDownloads'];

export default function usePackagesContents(): State {
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

  const { handleSortingChange, sort, sortingColumn, sortingDescending } =
    useTable<Item>({
      defaultSortingDescending: true,
      defaultSortingColumn: {
        sortingField: 'totalDownloads',
      },
    });

  const { filteringText, handleChange: handleTextFilterChange } =
    useTextFilter();

  const items: readonly Item[] = useMemo((): readonly Item[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const entries: [string, number[]][] = Object.entries(data);
    return entries.map(mapNpmDownloadsEntryToItem).filter(filterDefaultPackage);
  }, [data]);

  const filteredItems: readonly Item[] = useMemo((): readonly Item[] => {
    const filter = ({ packageName }: Readonly<Item>): boolean =>
      packageName.includes(filteringText);
    return items.filter(filter);
  }, [filteringText, items]);

  const visibleItems: readonly Item[] = useMemo((): readonly Item[] => {
    const newVisibleItems: Item[] = [...filteredItems];
    newVisibleItems.sort(sort);
    return paginate(newVisibleItems);
  }, [filteredItems, paginate, sort]);

  useAwsuiTableItemDescription({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: PackageDescription,
    colSpan: (visibleContent ?? DEFAULT_VISIBLE_CONTENT).length,
    items: visibleItems,
    ref,
  });

  const filteredItemsCount: number = filteredItems.length;
  return {
    cancelLabel: translate('Cancel') ?? '...',
    collectionPreferencesTitle: translate('Preferences') ?? '...',
    confirmLabel: translate('Confirm') ?? '...',
    countText: useCountText(filteredItemsCount),
    currentPageIndex,
    filteringAriaLabel: translate('Filter packages'),
    filteringPlaceholder: translate('Filter packages') ?? '...',
    filteringText,
    handleCollectionPreferencesConfirm,
    handlePaginationChange,
    handleSortingChange,
    handleTextFilterChange,
    items: visibleItems,
    loading: isLoading,
    loadingText: translate('Loading packages') ?? '...',
    pagesCount: Math.ceil(items.length / (pageSize ?? DEFAULT_PAGE_SIZE)),
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
