import type { ReactElement } from 'react';
import type { InsertionProps } from '../core/insertion-props.js';

/**
 *   An insertion contains content that is marked as added or content that is
 * being suggested for addition.
 *   Insertions are typically used to either mark differences between two
 * versions of content or to designate content suggested for addition in
 * scenarios where multiple people are revising content.
 * @see {@link https://w3c.github.io/aria/#insertion | WAI-ARIA `insertion` role}
 */
export default function Insertion({ children }: InsertionProps): ReactElement {
  return <ins role="insertion">{children}</ins>;
}
