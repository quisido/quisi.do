import type { ReactElement } from 'react';
import type { RadioGroupProps } from '../shared/radio-group-props.js';

/**
 *   A `RadioGroup` component groups `Radio` buttons so only one item in the
 * set can be checked at a time.
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
