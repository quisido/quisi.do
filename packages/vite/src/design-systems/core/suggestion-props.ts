import type { ReactNode } from 'react';
import type { RequiredReactNode } from './required-react-node.js';

interface DeletionProps {
  /**
   * A deletion represents content that is marked as removed, content that is
   * being suggested for removal, or content that is no longer relevant in the
   * context of its accompanying content.
   * Deletions are typically used to either mark differences between two
   * versions of content or to designate content suggested for removal in
   * scenarios where multiple people are revising content.
   * @see {@link https://w3c.github.io/aria/#deletion | WAI-ARIA `deletion` role}
   */
  readonly deletion: RequiredReactNode;
}

interface InsertionProps {
  /**
   * An insertion contains content that is marked as added or content that is
   * being suggested for addition.
   * Insertions are typically used to either mark differences between two
   * versions of content or to designate content suggested for addition in
   * scenarios where multiple people are revising content.
   * @see {@link https://w3c.github.io/aria/#insertion | WAI-ARIA `insertion` role}
   */
  readonly insertion: RequiredReactNode;
}

interface OptionalDeletionProps {
  readonly deletion?: ReactNode | undefined;
}

interface OptionalInsertionProps {
  readonly insertion?: ReactNode | undefined;
}

export type SuggestionProps =
  | (DeletionProps & OptionalInsertionProps)
  | (InsertionProps & OptionalDeletionProps);
