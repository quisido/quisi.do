import type { ReactNode } from 'react';

export type AlertDialogType = 'error' | 'info' | 'success' | 'warning';

interface BaseAlertDialogProps {
  readonly children: ReactNode;
  readonly icon?: ReactNode | undefined;
  readonly onDismiss: VoidFunction;
  readonly type?: AlertDialogType | undefined;
}

export interface HeadingAlertDialogProps extends BaseAlertDialogProps {
  readonly heading: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByAlertDialogProps extends BaseAlertDialogProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type AlertDialogProps =
  | HeadingAlertDialogProps
  | LabelAlertDialogProps
  | LabelledByAlertDialogProps;
