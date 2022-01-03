import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback } from 'react';
import useParamsMemo from 'use-params-memo';
import type TableColumn from '../../types/table-column';
import type TableRowsPerPageOption from '../../types/table-rows-per-page-option';
import type MuiRowsPerPageOption from './types/mui-rows-per-page-option';
import mapRowsPerPageOptionsToMuiRowsPerPageOptions from './utils/map-rows-per-page-options-to-mui-rows-per-page-options';

interface Props<Item> {
  readonly columns: readonly TableColumn<Item>[];
  readonly onPageChange: (page: number) => void;
  readonly onRowsPerPageChange: (rowsPerPage: number) => void;
  readonly rowsPerPageOptions: readonly TableRowsPerPageOption[];
}

interface State {
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

const BASE = 10;
const FIRST_PAGE = 0;
const MUI_PAGE_OFFSET = 1;

export default function useMuiTable<Item>({
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: Props<Item>): State {
  return {
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

    rowsPerPageOptions: useParamsMemo(
      mapRowsPerPageOptionsToMuiRowsPerPageOptions,
      [rowsPerPageOptions],
    ),
  };
}
