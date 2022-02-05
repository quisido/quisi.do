import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';
import type { TableProps } from '@awsui/components-react/table';
import type { TextFilterProps } from '@awsui/components-react/text-filter';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ComponentType, MutableRefObject } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import useAwsuiTableItemDescription from 'use-awsui-table-item-description';
import useParamsMemo from 'use-params-memo';
import type ReadonlyTableSortingEvent from '../../types/readonly-table-sorting-event';
import type TableColumn from '../../types/table-column';
import type TableRowsPerPageOption from '../../types/table-rows-per-page-option';
import filterByDefined from '../../utils/filter-by-defined';
import filterByUndefined from '../../utils/filter-by-undefined';
import useCountText from './hooks/use-aws-count-text';
import mapColumnToVisibleContentOption from './utils/map-column-to-visible-content-option';
import mapColumnsToDefinitions from './utils/map-columns-to-definitions';
import mapNumberDispatchToPaginationChangeHandler from './utils/map-number-dispatch-to-pagination-change-handler';
import mapRowsPerPageOptionToPageSizeOption from './utils/map-rows-per-page-option-to-page-size-option';
import mapSortingColumnToIndex from './utils/map-sorting-column-to-index';

interface Props<Item> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly TableColumn<Item>[];
  readonly onFilterChange: (filter: string) => void;
  readonly onPageChange: (page: number) => void;
  readonly onRowsPerPageChange: (rowsPerPage: number) => void;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly rows: readonly Item[];
  readonly rowsCount: number;
  readonly rowsPerPage: number;
  readonly rowsPerPageOptions: readonly TableRowsPerPageOption[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex?: number | undefined;
  readonly visibleColumnIndices: readonly number[];
  readonly onVisibleColumnsChange: (
    visibleColumnIndices: readonly number[],
  ) => void;
}

interface State<Item> {
  readonly DescriptionPortal: ComponentType<Record<string, never>>;
  readonly cancelLabel: string;
  readonly collectionPreferencesTitle: string;
  readonly columnDefinitions: readonly TableProps.ColumnDefinition<Item>[];
  readonly confirmLabel: string;
  readonly countText: string;
  readonly filteringAriaLabel: string | undefined;
  readonly pagesCount: number;
  readonly pageSizePreference: CollectionPreferencesProps.PageSizePreference;
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

const FIRST_PAGE = 1;

export default function useAwsTableHook<Item>({
  Description,
  columns,
  onFilterChange,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onVisibleColumnsChange,
  rows,
  rowsCount,
  rowsPerPage,
  rowsPerPageOptions,
  sortAscending,
  sortColumnIndex,
  visibleColumnIndices,
}: Props<Item>): State<Item> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const [wrapLines, setWrapLines] = useState(false);

  const columnDefinitions: readonly TableProps.ColumnDefinition<Item>[] =
    useParamsMemo(mapColumnsToDefinitions, [columns]);

  const visibleContent: readonly string[] = useMemo((): readonly string[] => {
    const mapColumnIndexToContent = (columnIndex: number): string => {
      const columnDefinition: TableProps.ColumnDefinition<Item> | undefined =
        columnDefinitions[columnIndex];
      if (filterByUndefined(columnDefinition)) {
        throw new Error(`Expected column definition #${columnIndex} to exist.`);
      }
      const content: string | undefined = columnDefinition.id;
      if (filterByUndefined(content)) {
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
    useAwsuiTableItemDescription({
      Component: Description,
      colSpan: visibleColumnIndices.length,
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
    filteringAriaLabel: translate('Filter packages'), // TODO
    pagesCount: Math.ceil(rowsCount / rowsPerPage),
    ref,
    sortingDescending: !sortAscending,
    visibleContent,
    wrapLines,

    handleCollectionPreferencesConfirm: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<
            Readonly<CollectionPreferencesProps.Preferences<void>>
          >
        >,
      ): void => {
        if (filterByDefined(e.detail.pageSize)) {
          onPageChange(FIRST_PAGE);
          onRowsPerPageChange(e.detail.pageSize);
        }

        if (filterByDefined(e.detail.visibleContent)) {
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
          onVisibleColumnsChange(newVisibleColumns);
        }

        if (filterByDefined(e.detail.wrapLines)) {
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

    handlePaginationChange: useParamsMemo(
      mapNumberDispatchToPaginationChangeHandler,
      [onPageChange],
    ),

    handleSortingChange: useCallback(
      (e: ReadonlyTableSortingEvent<Item>): void => {
        const columnIndex: number = mapSortingColumnToIndex(
          e.detail.sortingColumn,
        );
        onSort(columnIndex, e.detail.isDescending !== true);
      },
      [onSort],
    ),

    handleTextFilterChange: useCallback(
      (
        e: Readonly<
          NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
        >,
      ): void => {
        onFilterChange(e.detail.filteringText);
        onPageChange(FIRST_PAGE);
      },
      [onFilterChange, onPageChange],
    ),

    pageSizePreference: useMemo(
      (): CollectionPreferencesProps.PageSizePreference => ({
        options: rowsPerPageOptions.map(mapRowsPerPageOptionToPageSizeOption),
        title: translate('Select page size.') ?? '...',
      }),
      [rowsPerPageOptions, translate],
    ),

    preferences: useMemo(
      (): CollectionPreferencesProps.Preferences<void> => ({
        pageSize: rowsPerPage,
        visibleContent,
        wrapLines,
      }),
      [rowsPerPage, visibleContent, wrapLines],
    ),

    sortingColumn: useMemo((): TableProps.SortingColumn<Item> | undefined => {
      if (filterByUndefined(sortColumnIndex)) {
        return;
      }

      return {
        sortingField: sortColumnIndex.toString(),
      };
    }, [sortColumnIndex]),

    visibleContentPreference: useMemo(
      (): CollectionPreferencesProps.VisibleContentPreference => ({
        title: translate('Select visible columns.') ?? '...',
        options: [
          {
            label: translate('Properties') ?? '...',
            options: columns.map(mapColumnToVisibleContentOption),
          },
        ],
      }),
      [columns, translate],
    ),

    wrapLinesPreference: useMemo(
      (): CollectionPreferencesProps.WrapLinesPreference => ({
        label: translate('Wrap lines') ?? '...',
        description:
          translate('Select to wrap lines and see all text.') ?? '...',
      }),
      [translate],
    ),
  };
}
