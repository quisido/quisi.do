import type { ReactNode } from 'react';
import type { HeadingOrLabel } from './heading-or-label.js';

interface Props {
  readonly children: ReactNode;
  readonly description: ReactNode;
  /**
   * @default false
   */
  readonly modal?: boolean | undefined;
}

export type DialogProps = HeadingOrLabel<Props>;
