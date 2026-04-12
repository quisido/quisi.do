import type { ReactElement } from 'react';
import type { DeletionProps } from '../core/deletion-props.js';

/**
 *   A deletion represents content that is marked as removed, content that is
 * being suggested for removal, or content that is no longer relevant in the
 * context of its accompanying content.
 *   Deletions are typically used to either mark differences between two
 * versions of content or to designate content suggested for removal in
 * scenarios where multiple people are revising content.
 * @see {@link https://w3c.github.io/aria/#deletion | WAI-ARIA `deletion` role}
 */
export default function Deletion({ children }: DeletionProps): ReactElement {
  return <del role="deletion">{children}</del>;
}
