import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';
import type { RequiredReactNode } from './required-react-node.js';

export type DialogProps = OneOf<OneOfProps> & Props;

interface OneOfProps {
  readonly heading: RequiredReactNode;
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
