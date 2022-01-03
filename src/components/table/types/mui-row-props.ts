import type { Attributes, ComponentType } from 'react';
import type CellProps from '../types/mui-cell-props';

export default interface MuiTableRowProps {
  readonly Description?: ComponentType<Record<string, never>> | undefined;
  readonly cellProps: readonly (Required<Attributes> & CellProps)[];
}
