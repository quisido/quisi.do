import type { ReactElement, ReactNode } from 'react';

export interface EmphasisProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 *   An `Emphasis` component contains one or more emphasized characters.
 *   The `Emphasis` component stresses or emphasizes content. It is not for
 * communicating changes in typographical presentation that do not impact the
 * meaning of the content. Use the emphasis role only if its absence would
 * change the meaning of the content.
 *   Emphasis is not intended to convey importance; for that purpose, the
 * `Strong` component is more appropriate.
 * @see https://w3c.github.io/aria/#emphasis
 */
export default function Emphasis({
  children,
  describedBy,
}: EmphasisProps): ReactElement {
  return <em aria-describedby={describedBy}>{children}</em>;
}
