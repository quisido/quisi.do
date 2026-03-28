import type { ReactElement, ReactNode } from 'react';

export interface EmphasisProps {
  readonly children: ReactNode;
  readonly describedBy?: string | undefined;
}

/**
 *   An `Emphasis` component contains one or more emphasized characters.
 *   An emphasis stresses or emphasizes content. It is not for communicating
 * changes in typographical presentation that do not impact the meaning of the
 * content. Use emphasis only if its absence would change the meaning of the
 * content.
 *   Emphasis is not intended to convey importance; for that purpose, the
 * `Strong` component is more appropriate.
 * @see {@link https://w3c.github.io/aria/#emphasis | WAI-ARIA `emphasis` role}
 */
export default function Emphasis({
  children,
  describedBy,
}: EmphasisProps): ReactElement {
  return <em aria-describedby={describedBy}>{children}</em>;
}
