import type { ReactElement, ReactNode } from 'react';
import findRecord from './find-record';

export default function filterNodesByElement(
  node: ReactNode,
): node is ReactElement {
  return findRecord(node) && 'key' in node && 'props' in node && 'type' in node;
}
