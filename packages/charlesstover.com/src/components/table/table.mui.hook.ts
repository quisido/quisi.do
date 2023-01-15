import { IconButtonProps } from '@mui/material/IconButton';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import type { Attributes, ChangeEvent, ComponentType, MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import useWrapperVariant from '../../hooks/use-wrapper-variant';
import type Column from '../../types/table-column';
import type RowsPerPageOption from '../../types/table-rows-per-page-option';
import useRowProps from './hooks/use-mui-row-props';
import type HeadCellProps from './types/mui-head-cell-props';
import type RowProps from './types/mui-row-props';
import type MuiRowsPerPageOption from './types/mui-rows-per-page-option';
import mapColumnToHeadCellPartialProps from './utils/map-column-to-head-cell-partial-props';
import mapRowsPerPageOptionsToMuiRowsPerPageOptions from './utils/map-rows-per-page-options-to-mui-rows-per-page-options';

interface Props<Item> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly Column<Item>[];
  readonly onPageChange: (page: number) => void;
  readonly onRowsPerPageChange: (rowsPerPage: number) => void;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly page: number;
  readonly rows: readonly Item[];
  readonly rowsPerPageOptions: readonly RowsPerPageOption[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex: number | undefined;
}

interface State {
  readonly backIconButtonProps: Partial<IconButtonProps>;
  readonly handlePageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  readonly handleRowsPerPageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly headCellProps: (HeadCellProps & Required<Attributes>)[];
  readonly nextIconButtonProps: Partial<IconButtonProps>;
  readonly page: number;
  readonly rowProps: readonly (Required<Attributes> & RowProps)[];
  readonly rowsPerPageOptions: MuiRowsPerPageOption[];
  readonly showToolbar: boolean;
}

const ARRAY_INDEX_OFFSET = 1;
const BASE = 10;
const FIRST_PAGE = 1;
const MUI_PAGE_OFFSET = 1;

export default function useMuiTable<Item extends Record<string, unknown>>({
  Description,
  columns,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  page,
  rows,
  rowsPerPageOptions,
  sortAscending,
  sortColumnIndex,
}: Readonly<Props<Item>>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();
  const wrapperVariant: 'table' | 'wizard' | undefined = useWrapperVariant();

  return {
    page: page - ARRAY_INDEX_OFFSET,

    backIconButtonProps: useMemo(
      (): Partial<IconButtonProps> => ({
        'aria-label': translate('Go to previous page'),
      }),
      [translate],
    ),

    handlePageChange: useCallback(
      (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onPageChange(newPage + MUI_PAGE_OFFSET);
      },
      [onPageChange],
    ),

    handleRowsPerPageChange: useCallback(
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newRowsPerPage: number = parseInt(e.target.value, BASE);
        onRowsPerPageChange(newRowsPerPage);
        onPageChange(FIRST_PAGE);
      },
      [onPageChange, onRowsPerPageChange],
    ),

    headCellProps: useMemo((): (HeadCellProps & Required<Attributes>)[] => {
      const mapColumnToHeadCellProps = (
        column: Column<Item>,
        columnIndex: number,
      ): HeadCellProps & Required<Attributes> => ({
        ...mapColumnToHeadCellPartialProps(column, columnIndex),
        active: columnIndex === sortColumnIndex,
        ascending: sortAscending,
        onSort(ascending: boolean): void {
          onSort(columnIndex, ascending);
        },
      });

      return columns.map(mapColumnToHeadCellProps);
    }, [columns, onSort, sortAscending, sortColumnIndex]),

    nextIconButtonProps: useMemo(
      (): Partial<IconButtonProps> => ({
        'aria-label': translate('Go to next page'),
      }),
      [translate],
    ),

    rowProps: useRowProps({
      Description,
      columns,
      items: rows,
    }),

    rowsPerPageOptions: useMemo((): MuiRowsPerPageOption[] => {
      return mapRowsPerPageOptionsToMuiRowsPerPageOptions(rowsPerPageOptions);
    }, [rowsPerPageOptions]),

    showToolbar: wrapperVariant !== 'table',
  };
}
