import type { ComponentType } from 'react';

export default interface MuiTableCellProps {
  readonly Content: ComponentType<Record<string, never>>;
  readonly align: 'left' | 'right';
}
