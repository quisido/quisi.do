import { type ReactNode } from 'react';

import { type OneOf } from './one-of.js';
import { type RequiredReactNode } from './required-react-node.js';

interface OneOfProps {
  readonly heading: RequiredReactNode;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
  /** @default false */
  readonly tabbable?: boolean | undefined;
}

export type ArticleProps = OneOf<OneOfProps> & Props;
