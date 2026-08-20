import type { ReactElement } from 'react';
import type { ButtonProps } from '../core/button-props.js';
import classes from './button.module.scss';

/**
 * A button is an input that allows for user-triggered actions when clicked.
 * Buttons are mostly used for discrete actions. Standardizing the appearance
 * of buttons enhances the user's recognition of the widgets as buttons and
 * allows for a more compact display in toolbars.
 * For buttons that maintain a pressed state, refer to toggle button instead.
 * If the button action indicates a context change, such as move to next step in
 * a wizard or add another search criteria, then it should move focus to the
 * starting point for that action.
 * If the button is activated with a shortcut key, the focus should remain in
 * the context from which the shortcut key was activated. For example, if Alt +
 * U were assigned to an "Up" button that moves the currently focused item in a
 * list one position higher in the list, pressing Alt + U when the focus is in
 * the list would not move the focus from the list.
 */
export default function Button({
  children,
  disabled,
  onClick,
}: ButtonProps): ReactElement {
  const handleClick = (): void => {
    onClick();
  };

  return (
    <button
      aria-disabled={disabled}
      className={classes['button']}
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
