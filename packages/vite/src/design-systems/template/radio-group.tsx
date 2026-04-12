import type { ReactElement } from 'react';
import type { RadioGroupProps } from '../core/radio-group-props.js';

/**
 *   A radio group...
 * @see {@link https://w3c.github.io/aria/#radiogroup | WAI-ARIA `radiogroup` role}
 */
export default function RadioGroup({
  children,
  label,
}: RadioGroupProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <div aria-label={label} role="radiogroup">
      {children}
    </div>
  );
}
