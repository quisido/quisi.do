import type { ReactElement } from 'react';
import type { TermProps } from '../shared/term-props.js';

/**
 *   A `Term` component represents a word or phrase with an optional
 * corresponding definition.
 *   A term is used to explicitly identify a word or phrase for which a
 * definition has been provided or is expected to be provided by the user.
 *   _Do not_ use interactive elements such as links within a term.
 * @see {@link https://w3c.github.io/aria/#term | WAI-ARIA `term` role}
 */
export default function Term({
  children,
  definitionId,
}: TermProps): ReactElement {
  return <dfn aria-details={definitionId}>{children}</dfn>;
}
