import type { ReactNode } from 'react';

export type AlertDialogType = 'error' | 'info' | 'success' | 'warning';

export interface AlertDialogProps {
  readonly children: ReactNode;
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: AlertDialogType | undefined;
}
