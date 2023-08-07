import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import type { PaginationProps } from '@cloudscape-design/components/pagination';
import type { TableProps } from '@cloudscape-design/components/table';
import type { TextFilterProps } from '@cloudscape-design/components/text-filter';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType, MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import useTableItemDescription from 'use-awsui-table-item-description';
import type CollectionPreferencesEvent from '../../../../types/readonly-cloudscape-design-collection-preferences-event';
import type TableSortingEvent from '../../../../types/readonly-cloudscape-design-table-sorting-event';
import type TableColumn from '../../../../types/table-column';
import type TableRowsPerPageOption from '../../../../types/table-rows-per-page-option';
import useColumnDefinitions from './hooks/use-column-definitions';
import useCountText from './hooks/use-count-text';
import type PaginationChangeHandler from './types/pagination-change-handler';
import mapColumnToVisibleContentOption from './utils/map-column-to-visible-content-option';
import mapNumberDispatchToPaginationChangeHandler from './utils/map-number-dispatch-to-pagination-change-handler';
import mapRowsPerPageOptionToPageSizeOption from './utils/map-rows-per-page-option-to-page-size-option';
import mapSortingColumnToIndex from './utils/map-sorting-column-to-index';

interface Props<Item> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly TableColumn<Item>[];
  readonly filter?: string | undefined;
  readonly onFilterChange?: ((filter: string) => void) | undefined;
  readonly onPageChange?: ((page: number) => void) | undefined;
  readonly onRowsPerPageChange?: ((rowsPerPage: number) => void) | undefined;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly page?: number | undefined;
  readonly rows: readonly Item[];
  readonly rowsCount: number;
  readonly rowsPerPage: number;
  readonly rowsPerPageOptions?: readonly TableRowsPerPageOption[] | undefined;
  readonly sortAscending: boolean;
  readonly sortColumnIndex?: number | undefined;
  readonly visibleColumnIndices?: readonly number[] | undefined;
  readonly onVisibleColumnsChange?:
    | ((visibleColumnIndices: readonly number[]) => void)
    | undefined;
}

interface State<Item> {
  readonly DescriptionPortal: ComponentType<Record<string, never>>;
  readonly cancelLabel: string;
  readonly collectionPreferencesTitle: string;
  readonly columnDefinitions: readonly TableProps.ColumnDefinition<Item>[];
  readonly confirmLabel: string;
  readonly countText: string;
  readonly currentPageIndex: number;
  readonly filteringAriaLabel: string | undefined;
  readonly filteringText: string;
  readonly pagesCount: number;
  readonly paginationAriaLabels: PaginationProps.Labels;
  readonly preferences: CollectionPreferencesProps.Preferences;
  readonly ref: MutableRefObject<HTMLDivElement | null>;
  readonly sortingColumn: TableProps.SortingColumn<Item> | undefined;
  readonly sortingDescending: boolean | undefined;
  readonly stripedRowsPreference: CollectionPreferencesProps.StripedRowsPreference;
  readonly visibleContent: readonly string[] | undefined;
  readonly wrapLines: boolean | undefined;
  readonly wrapLinesPreference: CollectionPreferencesProps.WrapLinesPreference;
  readonly handleCollectionPreferencesConfirm: NonCancelableEventHandler<
    CollectionPreferencesProps.Preferences<void>
  >;
  readonly handlePaginationChange:
    | NonCancelableEventHandler<PaginationProps.ChangeDetail>
    | undefined;
  readonly handleSortingChange: (event: TableSortingEvent<Item>) => void;
  readonly handleTextFilterChange:
    | NonCancelableEventHandler<TextFilterProps.ChangeDetail>
    | undefined;
  readonly pageSizePreference:
    | CollectionPreferencesProps.PageSizePreference
    | undefined;
  readonly visibleContentPreference:
    | CollectionPreferencesProps.VisibleContentPreference
    | undefined;
}

const DEFAULT_ROWS_PER_PAGE_OPTIONS: readonly never[] = [];
const FIRST_PAGE = 1;

export default function useCloudscapeDesignTable<Item extends object>({
  Description,
  columns,
  filter,
  onFilterChange,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onVisibleColumnsChange,
  page = FIRST_PAGE,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  sortAscending,
  sortColumnIndex,
  visibleColumnIndices,
}: Readonly<Props<Item>>): State<Item> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [wrapLines, setWrapLines] = useState(false);

  const columnDefinitions: readonly TableProps.ColumnDefinition<Item>[] =
    useColumnDefinitions(columns);

  const visibleContent: readonly string[] | undefined = useMemo(():
    | readonly string[]
    | undefined => {
    if (typeof visibleColumnIndices === 'undefined') {
      return;
    }

    const mapColumnIndexToContent = (columnIndex: number): string => {
      const columnDefinition: TableProps.ColumnDefinition<Item> | undefined =
        columnDefinitions[columnIndex];
      if (typeof columnDefinition === 'undefined') {
        throw new Error(`Expected column definition #${columnIndex} to exist.`);
      }

      const content: string | undefined = columnDefinition.id;
      if (typeof content === 'undefined') {
        throw new Error(
          `Expected column definition #${columnIndex} to have an ID.`,
        );
      }

      return content;
    };

    return visibleColumnIndices.map(mapColumnIndexToContent);
  }, [columnDefinitions, visibleColumnIndices]);

  // Effects
  const DescriptionPortal: ComponentType<Record<string, never>> =
    useTableItemDescription({
      Component: Description,
      colSpan: visibleColumnIndices?.length ?? columnDefinitions.length,
      items: rows,
      ref,
    });

  return {
    DescriptionPortal,
    cancelLabel: translate('Cancel') ?? '...',
    collectionPreferencesTitle: translate('Preferences') ?? '...',
    columnDefinitions,
    confirmLabel: translate('Confirm') ?? '...',
    countText: useCountText(rowsCount),
    currentPageIndex: page,
    filteringAriaLabel: translate('Filter packages'), // TODO
    filteringText: filter ?? '',
    pagesCount: Math.ceil(rowsCount / rowsPerPage),
    ref,
    sortingDescending: !sortAscending,
    visibleContent,
    wrapLines,

    handleCollectionPreferencesConfirm: useCallback(
      (e: CollectionPreferencesEvent<void>): void => {
        if (typeof e.detail.pageSize !== 'undefined') {
          onPageChange?.(FIRST_PAGE);
          onRowsPerPageChange?.(e.detail.pageSize);
        }

        if (typeof e.detail.visibleContent !== 'undefined') {
          const mapContentItemToColumn = (item: string): number => {
            const findColumnDefinition = ({
              id,
            }: Readonly<TableProps.ColumnDefinition<Item>>): boolean => {
              return id === item;
            };
            return columnDefinitions.findIndex(findColumnDefinition);
          };

          const mapContentToColumns = (
            content: readonly string[],
          ): readonly number[] => {
            return content.map(mapContentItemToColumn);
          };

          const newVisibleColumns: readonly number[] = mapContentToColumns(
            e.detail.visibleContent,
          );
          onVisibleColumnsChange?.(newVisibleColumns);
        }

        if (typeof e.detail.wrapLines !== 'undefined') {
          setWrapLines(e.detail.wrapLines);
        }
      },
      [
        columnDefinitions,
        onPageChange,
        onRowsPerPageChange,
        onVisibleColumnsChange,
      ],
    ),

    handlePaginationChange: useMemo((): PaginationChangeHandler | undefined => {
      if (typeof onPageChange === 'undefined') {
        return;
      }
      return mapNumberDispatchToPaginationChangeHandler(onPageChange);
    }, [onPageChange]),

    handleSortingChange: useCallback(
      (e: TableSortingEvent<Item>): void => {
        const columnIndex: number = mapSortingColumnToIndex(
          e.detail.sortingColumn,
        );
        onSort(columnIndex, e.detail.isDescending !== true);
      },
      [onSort],
    ),

    handleTextFilterChange: useMemo(():
      | NonCancelableEventHandler<TextFilterProps.ChangeDetail>
      | undefined => {
      if (typeof onFilterChange === 'undefined') {
        return;
      }

      return (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
        >,
      ): void => {
        onFilterChange(e.detail.filteringText);
        onPageChange?.(FIRST_PAGE);
      };
    }, [onFilterChange, onPageChange]),

    pageSizePreference: useMemo(():
      | CollectionPreferencesProps.PageSizePreference
      | undefined => {
      if (typeof onRowsPerPageChange === 'undefined') {
        return;
      }

      return {
        options: rowsPerPageOptions.map(mapRowsPerPageOptionToPageSizeOption),
        title: translate('Select page size.') ?? '...',
      };
    }, [onRowsPerPageChange, rowsPerPageOptions, translate]),

    paginationAriaLabels: useMemo(
      (): PaginationProps.Labels => ({
        nextPageLabel: translate('Go to next page.') ?? 'Go to next page.',
        previousPageLabel:
          translate('Go to previous page.') ?? 'Go to previous page.',
      }),
      [translate],
    ),

    preferences: useMemo((): CollectionPreferencesProps.Preferences<void> => {
      if (typeof visibleContent === 'undefined') {
        return {
          pageSize: rowsPerPage,
          wrapLines,
        };
      }

      return {
        pageSize: rowsPerPage,
        visibleContent,
        wrapLines,
      };
    }, [rowsPerPage, visibleContent, wrapLines]),

    sortingColumn: useMemo((): TableProps.SortingColumn<Item> | undefined => {
      if (typeof sortColumnIndex === 'undefined') {
        return;
      }

      return {
        sortingField: sortColumnIndex.toString(),
      };
    }, [sortColumnIndex]),

    stripedRowsPreference: useMemo(
      (): CollectionPreferencesProps.StripedRowsPreference => ({
        label: translate('Striped rows') ?? '...',
        description:
          translate('Select to add alternating shaded rows.') ?? '...',
      }),
      [translate],
    ),

    visibleContentPreference: useMemo(():
      | CollectionPreferencesProps.VisibleContentPreference
      | undefined => {
      if (typeof onVisibleColumnsChange === 'undefined') {
        return;
      }

      return {
        title: translate('Select visible columns.') ?? '...',
        options: [
          {
            label: translate('Properties') ?? '...',
            options: columns.map(mapColumnToVisibleContentOption),
          },
        ],
      };
    }, [columns, onVisibleColumnsChange, translate]),

    wrapLinesPreference: useMemo(
      (): CollectionPreferencesProps.WrapLinesPreference => ({
        label: translate('Wrap lines') ?? '...',
        description:
          translate('Select to see all the text and wrap the lines.') ?? '...',
      }),
      [translate],
    ),
  };
}
