import type { ReactNode } from 'react';
import type { HeadingOrLabelProps } from './heading-or-label-props.js';

export type AlertDialogType = 'error' | 'info' | 'success' | 'warning';

interface Props {
  readonly children: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: AlertDialogType | undefined;
}

export type AlertDialogProps = HeadingOrLabelProps & Props;
