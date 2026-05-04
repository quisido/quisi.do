import type { ReactNode } from 'react';

export type AlertDialogType = 'error' | 'info' | 'success' | 'warning';

export interface AlertDialogProps {
  /**
   * This should be `RequiredReactNode`, but we don't want to annoy consumers
   * who are passing around `ReactNode`.
   */
  readonly children: ReactNode;
  /**
   * This should be `RequiredReactNode`, but we don't want to annoy consumers
   * who are passing around `ReactNode`.
   */
  readonly heading: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: AlertDialogType | undefined;
}
