import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

interface OneOfProps {
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
  readonly description: ReactNode;
  /**
   * @default false
   */
  readonly modal?: boolean | undefined;
  readonly onDismiss?: VoidFunction | undefined;
}

export type DialogProps = OneOf<OneOfProps> & Props;
