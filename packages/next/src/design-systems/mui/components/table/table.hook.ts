import type { IconButtonProps } from '@mui/material/IconButton';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { Attributes, ChangeEvent, ComponentType, MouseEvent } from 'react';
import { useMemo } from 'react';
import useWrapperVariant from '../../../../hooks/use-wrapper-variant';
import type Column from '../../../../types/table-column';
import type RowsPerPageOption from '../../../../types/table-rows-per-page-option';
import useRowProps from './hooks/use-row-props';
import type HeadCellProps from './types/head-cell-props';
import type RowProps from './types/row-props';
import type MuiRowsPerPageOption from './types/rows-per-page-option';
import mapColumnToHeadCellPartialProps from './utils/map-column-to-head-cell-partial-props';
import mapRowsPerPageOptionsToMuiRowsPerPageOptions from './utils/map-rows-per-page-options-to-mui-rows-per-page-options';

interface Props<Item> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly Column<Item>[];
  readonly onPageChange?: ((page: number) => void) | undefined;
  readonly onRowsPerPageChange?: ((rowsPerPage: number) => void) | undefined;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly page: number;
  readonly rows: readonly Item[];
  readonly rowsPerPageOptions?: readonly RowsPerPageOption[] | undefined;
  readonly sortAscending: boolean;
  readonly sortColumnIndex?: number | undefined;
}

interface State {
  readonly backIconButtonProps: Partial<IconButtonProps>;
  readonly headCellProps: (HeadCellProps & Required<Attributes>)[];
  readonly nextIconButtonProps: Partial<IconButtonProps>;
  readonly page: number;
  readonly rowProps: readonly (Required<Attributes> & RowProps)[];
  readonly rowsPerPageOptions?: MuiRowsPerPageOption[] | undefined;
  readonly showToolbar: boolean;
  readonly handlePageChange:
    | ((event: MouseEvent<HTMLButtonElement> | null, page: number) => void)
    | undefined;
  readonly handleRowsPerPageChange?:
    | ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
    | undefined;
}

const ARRAY_INDEX_OFFSET = 1;
const BASE = 10;
const FIRST_PAGE = 1;
const MUI_PAGE_OFFSET = 1;

export default function useMuiTable<Item extends object>({
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
    showToolbar: wrapperVariant !== 'table',

    backIconButtonProps: useMemo(
      (): Partial<IconButtonProps> => ({
        'aria-label': translate('Go to previous page.'),
      }),
      [translate],
    ),

    handlePageChange: useMemo(():
      | ((event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void)
      | undefined => {
      if (typeof onPageChange === 'undefined') {
        return;
      }

      return (
        _event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ): void => {
        onPageChange(newPage + MUI_PAGE_OFFSET);
      };
    }, [onPageChange]),

    handleRowsPerPageChange: useMemo(():
      | ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
      | undefined => {
      if (typeof onRowsPerPageChange === 'undefined') {
        return;
      }

      return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newRowsPerPage: number = parseInt(e.target.value, BASE);
        onRowsPerPageChange(newRowsPerPage);
        onPageChange?.(FIRST_PAGE);
      };
    }, [onPageChange, onRowsPerPageChange]),

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
        'aria-label': translate('Go to next page.'),
      }),
      [translate],
    ),

    rowProps: useRowProps({
      Description,
      columns,
      items: rows,
    }),

    rowsPerPageOptions: useMemo((): MuiRowsPerPageOption[] | undefined => {
      if (typeof rowsPerPageOptions === 'undefined') {
        return;
      }

      return mapRowsPerPageOptionsToMuiRowsPerPageOptions(rowsPerPageOptions);
    }, [rowsPerPageOptions]),
  };
}
