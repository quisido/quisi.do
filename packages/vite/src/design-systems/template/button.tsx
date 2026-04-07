import type { ReactElement } from 'react';
import type { ButtonProps } from '../core/button-props.js';

/**
 *   A `Button` component is an input that allows for user-triggered actions
 * when clicked or pressed.
 *   Buttons are mostly used for discrete actions. Standardizing the appearance
 * of buttons enhances the user's recognition of the widgets as buttons and
 * allows for a more compact display in toolbars.
 */
export default function Button({
  children,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
}
