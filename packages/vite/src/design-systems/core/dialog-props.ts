import type { ReactNode } from 'react';
import type { HeadingOrLabelProps } from './heading-or-label-props.js';

interface Props {
  readonly children: ReactNode;
  readonly description: ReactNode;
  /**
   * @default false
   */
  readonly modal?: boolean | undefined;
  readonly onDismiss?: VoidFunction | undefined;
}

export type DialogProps = HeadingOrLabelProps & Props;
