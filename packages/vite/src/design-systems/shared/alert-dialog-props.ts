import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

export type AlertDialogType = 'error' | 'info' | 'success' | 'warning';

interface Props {
  readonly children: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: AlertDialogType | undefined;
}

export type AlertDialogProps = HeadingOrLabel<Props>;
