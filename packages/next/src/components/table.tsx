import { type ComponentType, type ReactElement, type ReactNode } from 'react';
import type Column from '../types/table-column.js';
import type RowsPerPageOption from '../types/table-rows-per-page-option.js';
import DesignSystem from './design-system/index.js';

export interface Props<Item extends object> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly Column<Item>[];
  readonly filter?: string | undefined;
  readonly filterPlaceholder?: string | undefined;
  readonly header?: ReactNode | undefined;
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
  readonly subheader?: ReactNode | undefined;
  readonly visibleColumnIndices?: readonly number[] | undefined;
  readonly onVisibleColumnsChange?:
    | ((visibleColumnIndices: readonly number[]) => void)
    | undefined;
}

export default function Table<Item extends object>(
  props: Readonly<Props<Item>>,
): ReactElement {
  return <DesignSystem props={props} type="table" />;
}
