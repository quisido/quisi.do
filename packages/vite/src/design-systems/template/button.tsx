import type { ReactElement } from 'react';
import type { ButtonProps } from '../core/button-props.js';
import classes from './button.module.scss';

/**
 * A button is an input that allows for user-triggered actions when clicked.
 * Buttons are mostly used for discrete actions. Standardizing the appearance
 * of buttons enhances the user's recognition of the widgets as buttons and
 * allows for a more compact display in toolbars.
 * For buttons that maintain a pressed state, refer to toggle button instead.
 */
export default function Button({
  children,
  disabled,
  onClick,
}: ButtonProps): ReactElement {
  return (
    <button
      aria-disabled={disabled}
      className={classes['button']}
      disabled
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
