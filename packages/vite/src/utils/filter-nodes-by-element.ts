import { isRecord } from 'fmrs';
import { type ReactElement, type ReactNode } from 'react';

export default function filterNodesByElement(
  node: ReactNode,
): node is ReactElement {
  return isRecord(node) && 'key' in node && 'props' in node && 'type' in node;
}
