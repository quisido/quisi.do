import type { ReactElement } from 'react';
import type { SuggestionProps } from '../core/suggestion-props.js';

/**
 *   A suggestion is a single proposed change to content.
 *   For example, in an editing system that supports multiple users, one user
 * can suggest a change, and another user would be responsible for accepting or
 * rejecting the suggestion.
 * ```tsx
 * <Paragraph>
 *   The best pet is a{' '}
 *   <Suggestion deletion="cat" insertion="dog" />
 * </Paragraph>
 * ```
 * @see {@link https://w3c.github.io/aria/#suggestion | WAI-ARIA `suggestion` role}
 */
export default function Suggestion({
  deletion,
  insertion,
}: SuggestionProps): ReactElement {
  return (
    <span role="suggestion">
      {insertion && <ins role="insertion">{insertion}</ins>}
      {deletion && <del role="deletion">{deletion}</del>}
    </span>
  );
}
