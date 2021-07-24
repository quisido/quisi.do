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
import PackageDescription from '../../components/package-description';
import filterDefaultPackage from '../../filter/filter-default-package';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import mapNpmDownloadsEntryToPackagesTableItem from '../../map/map-npm-downloads-entry-to-packages-table-item';
import type PackagesTableItem from '../../types/packages-table-item';
import type ReadonlyTableSortingEvent from '../../types/readonly-table-sorting-event';
import useColumnDefinitions from './packages-table.hook.column-definitions';
import useCountText from './packages-table.hook.count-text';
import usePageSizePreference from './packages-table.hook.page-size-preference';
import useVisibleContentPreference from './packages-table.hook.visible-content-preference';
import useWrapLinesPreference from './packages-table.hook.wrap-lines-preference';

interface State {
  readonly cancelLabel: string;
  readonly collectionPreferencesTitle: string;
  readonly columnDefinitions: readonly TableProps.ColumnDefinition<PackagesTableItem>[];
  readonly confirmLabel: string;
  readonly countText: string;
  readonly currentPageIndex: number;
  readonly filteringAriaLabel?: string;
  readonly filteringPlaceholder: string;
  readonly filteringText: string;
  readonly items: readonly PackagesTableItem[];
  readonly loading: boolean;
  readonly loadingText: string;
  readonly pageSizePreference: CollectionPreferencesProps.PageSizePreference;
  readonly pagesCount: number;
  readonly preferences: CollectionPreferencesProps.Preferences;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly sortingColumn?: TableProps.SortingColumn<PackagesTableItem>;
  readonly sortingDescending?: boolean;
  readonly visibleContent?: readonly string[];
  readonly visibleContentPreference: CollectionPreferencesProps.VisibleContentPreference;
  readonly wrapLines?: boolean;
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
    event: ReadonlyTableSortingEvent<PackagesTableItem>,
  ) => void;
  readonly handleTextFilterChange: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
    >,
  ) => void;
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

  const { handleSortingChange, sort, sortingColumn, sortingDescending } =
    useTable<PackagesTableItem>({
      defaultSortingDescending: true,
      defaultSortingColumn: {
        sortingField: 'totalDownloads',
      },
    });

  const { filteringText, handleChange: handleTextFilterChange } =
    useTextFilter();

  const items: PackagesTableItem[] = useMemo((): PackagesTableItem[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const entries: [string, number[]][] = Object.entries(data);
    return entries
      .map(mapNpmDownloadsEntryToPackagesTableItem)
      .filter(filterDefaultPackage);
  }, [data]);

  const filteredItems: readonly PackagesTableItem[] =
    useMemo((): readonly PackagesTableItem[] => {
      const filter = ({ packageName }: Readonly<PackagesTableItem>): boolean =>
        packageName.includes(filteringText);
      return items.filter(filter);
    }, [filteringText, items]);

  const visibleItems: readonly PackagesTableItem[] =
    useMemo((): readonly PackagesTableItem[] => {
      const newVisibleItems: PackagesTableItem[] = [...filteredItems];
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
