import type { ReactElement, ReactNode } from 'react';
import { Fragment } from 'react';

export default function mapNodeToFragment(
  node: ReactNode,
  index: number,
): ReactElement {
  return <Fragment key={index}>{node}</Fragment>;
}
