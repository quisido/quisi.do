import { type ComponentType } from 'react';
import type { WithKey } from '../../../../../types/with-key.js';
import type CellProps from './cell-props.js';

export default interface MuiTableRowProps {
  readonly Description?: ComponentType<Record<string, never>> | undefined;
  readonly cellProps: readonly WithKey<CellProps>[];
}
