import type { ReactNode } from 'react';
import type { RequiredReactNode } from '../core/required-react-node.js';

export default function isRequiredReactNode(
  node: ReactNode,
): node is RequiredReactNode {
  return typeof node !== 'boolean' && node !== null && node !== undefined;
}
