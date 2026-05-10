import type { ReactElement } from 'react';
import classes from './toggle-button.module.scss';
import { type ToggleButtonProps } from '../core/index.js';

export default function ToggleButton({
  children,
  disabled,
  onPress,
  onUnpress,
  pressed,
}: ToggleButtonProps): ReactElement {
  const handleClick = (): void => {
    if (pressed) {
      onUnpress();
      return;
    }

    onPress();
  };

  return (
    <button
      aria-disabled={disabled}
      aria-pressed={pressed}
      className={classes['toggle-button']}
      disabled={disabled}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
}
