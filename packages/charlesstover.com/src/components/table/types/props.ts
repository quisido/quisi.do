import type { ComponentType, ReactElement } from 'react';
import type Column from '../../../types/table-column';
import type RowsPerPageOption from '../../../types/table-rows-per-page-option';

export default interface Props<Item> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly Column<Item>[];
  readonly filter?: string;
  readonly filterPlaceholder?: string | undefined;
  readonly header?: ReactElement;
  readonly loading?: string | undefined;
  readonly onFilterChange?: ((filter: string) => void) | undefined;
  readonly onPageChange?: ((page: number) => void) | undefined;
  readonly onRowsPerPageChange?: ((rowsPerPage: number) => void) | undefined;
  readonly onSort: (columnIndex: number, ascending: boolean) => void;
  readonly page?: number | undefined;
  readonly rows: readonly Item[];
  readonly rowsCount: number;
  readonly rowsPerPage: number;
  readonly rowsPerPageOptions?: readonly RowsPerPageOption[] | undefined;
  readonly sortAscending: boolean;
  readonly sortColumnIndex?: number | undefined;
  readonly visibleColumnIndices?: readonly number[] | undefined;
  readonly onVisibleColumnsChange?:
    | ((visibleColumnIndices: readonly number[]) => void)
    | undefined;
}
