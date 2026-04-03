import type { ReactNode } from 'react';

interface BaseAlertProps {
  /**
   * @default true
   */
  readonly atomic?: boolean | undefined;
  readonly children: ReactNode;
  readonly heading?: ReactNode | undefined;
  readonly icon?: string | undefined;
  /**
   * @default 'assertive'
   */
  readonly live?: 'off' | 'assertive' | 'polite' | undefined;
  readonly type: 'error' | 'info' | 'success' | 'warning';
}

export interface HeadingAlertProps extends BaseAlertProps {
  readonly heading: ReactNode;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

export interface LabelAlertProps extends BaseAlertProps {
  readonly heading?: undefined;
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByAlertProps extends BaseAlertProps {
  readonly heading?: undefined;
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type AlertProps =
  | HeadingAlertProps
  | LabelAlertProps
  | LabelledByAlertProps;
