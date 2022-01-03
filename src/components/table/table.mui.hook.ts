import type { Attributes, ChangeEvent, MouseEvent } from 'react';
import { useCallback, useMemo } from 'react';
import useParamsMemo from 'use-params-memo';
import type Column from '../../types/table-column';
import type RowsPerPageOption from '../../types/table-rows-per-page-option';
import type MuiHeadCellProps from './types/mui-head-cell-props';
import type MuiRowsPerPageOption from './types/mui-rows-per-page-option';
import mapColumnToHeadCellPartialProps from './utils/map-column-to-head-cell-partial-props';
import mapRowsPerPageOptionsToMuiRowsPerPageOptions from './utils/map-rows-per-page-options-to-mui-rows-per-page-options';

interface Props<Item> {
  readonly columns: readonly Column<Item>[];
  readonly onPageChange: (page: number) => void;
  readonly onRowsPerPageChange: (rowsPerPage: number) => void;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly page: number;
  readonly rowsPerPageOptions: readonly RowsPerPageOption[];
  readonly sortAscending: boolean;
  readonly sortColumnIndex: number | undefined;
}

interface State {
  readonly headCellProps: (Required<Attributes> & MuiHeadCellProps)[];
  readonly page: number;
  readonly rowsPerPageOptions: MuiRowsPerPageOption[];
  readonly handlePageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  readonly handleRowsPerPageChange: (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ARRAY_INDEX_OFFSET = 1;
const BASE = 10;
const FIRST_PAGE = 0;
const MUI_PAGE_OFFSET = 1;

export default function useMuiTable<Item>({
  columns,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  page,
  rowsPerPageOptions,
  sortAscending,
  sortColumnIndex,
}: Props<Item>): State {
  return {
    page: page - ARRAY_INDEX_OFFSET,

    handlePageChange: useCallback(
      (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onPageChange(newPage + MUI_PAGE_OFFSET);
      },
      [onPageChange],
    ),

    handleRowsPerPageChange: useCallback(
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newRowsPerPage: number = parseInt(e.target.value, BASE);
        onRowsPerPageChange(newRowsPerPage);
        onPageChange(FIRST_PAGE);
      },
      [onPageChange, onRowsPerPageChange],
    ),

    headCellProps: useMemo((): (Required<Attributes> & MuiHeadCellProps)[] => {
      const mapColumnToHeadCellProps = (
        column: Column<Item>,
        columnIndex: number,
      ): Required<Attributes> & MuiHeadCellProps => ({
        ...mapColumnToHeadCellPartialProps(column, columnIndex),
        active: columnIndex === sortColumnIndex,
        ascending: sortAscending,
        onSort(ascending: boolean): void {
          onSort(columnIndex, ascending);
        },
      });

      return columns.map(mapColumnToHeadCellProps);
    }, [columns, onSort, sortAscending, sortColumnIndex]),

    rowsPerPageOptions: useParamsMemo(
      mapRowsPerPageOptionsToMuiRowsPerPageOptions,
      [rowsPerPageOptions],
    ),
  };
}
