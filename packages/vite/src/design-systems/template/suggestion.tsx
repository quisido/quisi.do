import type { ReactElement } from 'react';
import type { SuggestionProps } from '../core/suggestion-props.js';

/**
 *   A `Suggestion` component represents a single proposed change to content.
 * It is used to wrap the associated `Insertion` and/or `Deletion` content for
 * that proposed edit.
 */
export default function Suggestion({
  children,
  label,
}: SuggestionProps): ReactElement {
  return (
    <ins aria-label={label} role="suggestion">
      {children}
    </ins>
  );
}
