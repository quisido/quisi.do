import { type ReactNode } from 'react';
import filterNodesByElement from './filter-nodes-by-element.js';

export default function filterNodesByImage(node: ReactNode): boolean {
  return filterNodesByElement(node) && node.type === 'img';
}
