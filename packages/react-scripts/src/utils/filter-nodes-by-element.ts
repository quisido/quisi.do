import type { ReactElement, ReactNode } from 'react';
import isRecord from './is-record';

export default function filterNodesByElement(
  node: ReactNode,
): node is ReactElement {
  return isRecord(node) && 'key' in node && 'props' in node && 'type' in node;
}
