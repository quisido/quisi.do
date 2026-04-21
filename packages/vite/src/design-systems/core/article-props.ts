import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

export type ArticleProps = OneOf<OneOfProps> & Props;

interface OneOfProps {
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
}
