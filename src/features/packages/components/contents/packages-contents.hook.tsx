import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import useNpmDownloads from '../../../../hooks/use-npm-downloads';
import type TableColumn from '../../../../types/table-column';
import type TableRowsPerPageOption from '../../../../types/table-rows-per-page-option';
import Paginator from '../../../../utils/paginator';
import type Item from '../../types/packages-item';
import filterDefaultPackage from '../../utils/filter-default-package';
import mapNpmDownloadsEntryToItem from '../../utils/map-npm-downloads-entry-to-item';
import useColumns from './packages-contents.hook.columns';
// import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
// import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
// import type { PaginationProps } from '@awsui/components-react/pagination';
// import type { TableProps } from '@awsui/components-react/table';
// import type { TextFilterProps } from '@awsui/components-react/text-filter';
// import {
//   useCollectionPreferences,
//   usePagination,
//   useTable,
//   useTextFilter,
// } from 'use-awsui';
// import useAwsuiTableItemDescription from 'use-awsui-table-item-description';
// import useNpmDownloads from '../../../../hooks/use-npm-downloads';
// import type ReadonlyTableSortingEvent from '../../../../types/readonly-table-sorting-event';
// import filterDefaultPackage from '../../utils/filter-default-package';
// import mapNpmDownloadsEntryToItem from '../../utils/map-npm-downloads-entry-to-item';
// import useColumnDefinitions from './packages-contents.hook.column-definitions';
// import useCountText from './packages-contents.hook.count-text';
// import usePageSizePreference from './packages-contents.hook.page-size-preference';
// import useVisibleContentPreference from './packages-contents.hook.visible-content-preference';
// import useWrapLinesPreference from './packages-contents.hook.wrap-lines-preference';

interface State {
  readonly columns: readonly TableColumn<Item>[];
  readonly filter: string;
  readonly filterPlaceholder: string | undefined;
  readonly handleFilterChange: (filter: string) => void;
  readonly handlePageChange: (page: number) => void;
  readonly handleRowsPerPageChange: (rowsPerPage: number) => void;
  readonly handleSort: (columnIndex: number, ascending: boolean) => void;
  readonly loading: string | undefined;
  readonly page: number;
  readonly rows: readonly Item[];
  readonly rowsCount: number;
  readonly rowsPerPage: number;
  readonly rowsPerPageOptions: readonly TableRowsPerPageOption[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex: number;
  readonly visibleColumnIndices: readonly number[];
  readonly handleVisibleColumnsChange: (
    visibleColumnIndices: readonly number[],
  ) => void;
}

const BASE_PAGE_SIZE = 5;
const DEFAULT_PAGE = 1;
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_SORT_COLUMN_INDEX = 1;
const FIRST = 0;
const MULTIPLIER = 2;
const SECOND = 1;
const SQUARED = 2;

const DEFAULT_VISIBLE_COLUMN_INDICES: readonly number[] = [FIRST, SECOND];

// 5, 10, 20, 50
const PAGE_SIZES: number[] = [
  BASE_PAGE_SIZE,
  BASE_PAGE_SIZE * MULTIPLIER,
  BASE_PAGE_SIZE * Math.pow(MULTIPLIER, SQUARED),
  Math.pow(BASE_PAGE_SIZE, SQUARED) * MULTIPLIER,
];

export default function usePackagesContents(): State {
  // Contexts
  const { data, isLoading } = useNpmDownloads();
  const translate: TranslateFunction = useTranslate();

  // States
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [sortAscending, setSortAscending] = useState(false);
  const [sortColumnIndex, setSortColumnIndex] = useState(
    DEFAULT_SORT_COLUMN_INDEX,
  );
  const [visibleColumnIndices, setVisibleColumnIndices] = useState(
    DEFAULT_VISIBLE_COLUMN_INDICES,
  );

  const items: readonly Item[] = useMemo((): readonly Item[] => {
    if (typeof data === 'undefined') {
      return [];
    }
    const entries: [string, number[]][] = Object.entries(data);
    return entries.map(mapNpmDownloadsEntryToItem).filter(filterDefaultPackage);
  }, [data]);

  const columns: readonly TableColumn<Item>[] = useColumns(filter);

  const filteredItems: readonly Item[] = useMemo((): readonly Item[] => {
    const filterByFilter = ({ packageName }: Readonly<Item>): boolean =>
      packageName.includes(filter);
    return items.filter(filterByFilter);
  }, [filter, items]);

  const paginator: Paginator = useMemo(
    (): Paginator => new Paginator({ page, rowsPerPage }),
    [page, rowsPerPage],
  );

  return {
    columns,
    filter,
    filterPlaceholder: translate('Filter packages'),
    handleFilterChange: setFilter,
    handlePageChange: setPage,
    handleRowsPerPageChange: setRowsPerPage,
    handleVisibleColumnsChange: setVisibleColumnIndices,
    page,
    rowsCount: filteredItems.length,
    rowsPerPage,
    sortAscending,
    sortColumnIndex,
    visibleColumnIndices,

    handleSort: useCallback((columnIndex: number, ascending: boolean): void => {
      setSortAscending(ascending);
      setSortColumnIndex(columnIndex);
    }, []),

    loading: useMemo((): string | undefined => {
      if (!isLoading) {
        return;
      }
      return translate('Loading packages') ?? '...';
    }, [isLoading, translate]),

    rows: useMemo((): readonly Item[] => {
      const newRows: Item[] = [...filteredItems];

      const sortColumn: TableColumn<Item> | undefined =
        columns[sortColumnIndex];
      if (typeof sortColumn === 'undefined') {
        throw new Error(`Expected column at index ${sortColumnIndex}.`);
      }

      newRows.sort(sortColumn.sort);
      if (!sortAscending) {
        newRows.reverse();
      }

      return paginator.paginate(newRows);
    }, [columns, filteredItems, paginator, sortAscending, sortColumnIndex]),

    rowsPerPageOptions: useMemo((): readonly TableRowsPerPageOption[] => {
      const mapNumberToPageSizeOption = (
        value: number,
      ): TableRowsPerPageOption => ({
        label: translate('$count packages', { count: value }),
        value,
      });

      return PAGE_SIZES.map(mapNumberToPageSizeOption);
    }, [translate]),
  };
}
