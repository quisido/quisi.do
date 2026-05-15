import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';
import type { RequiredReactNode } from './required-react-node.js';

export type ApplicationProps = OneOf<OneOfProps> & Props;

interface OneOfProps {
  readonly heading: RequiredReactNode;
  readonly label: string;
  readonly labelledBy: string;
}

interface Props {
  readonly banner?: ReactNode | undefined;
  readonly children: ReactNode;
  readonly contentInfo?: ReactNode | undefined;
  readonly describedBy?: string | undefined;
  readonly roleDescription?: string | undefined;
}
