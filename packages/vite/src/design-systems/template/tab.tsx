import type { ReactElement } from 'react';
import type { TabProps } from '../core/tab-props.js';

/**
 *   A tab...
 * @see {@link https://w3c.github.io/aria/#tab | WAI-ARIA `tab` role}
 */
export default function Tab({
  children,
  selected = false,
}: TabProps): ReactElement {
  return (
    <button aria-selected={selected} role="tab" type="button">
      {children}
    </button>
  );
}
