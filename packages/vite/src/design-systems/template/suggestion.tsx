import type { ReactElement } from 'react';
import type { SuggestionProps } from '../core/suggestion-props.js';

/**
 *   A suggestion...
 * @see {@link https://w3c.github.io/aria/#suggestion | WAI-ARIA `suggestion` role}
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
