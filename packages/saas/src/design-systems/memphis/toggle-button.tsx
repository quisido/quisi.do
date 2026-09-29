import { type ReactElement } from 'react';

import { type ToggleButtonProps } from '../core/index.js';
import classes from './toggle-button.module.scss';

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
      <span aria-hidden="true" className={classes['shadow']} />
      <span aria-hidden="true" className={classes['canvas']}>
        <span className={classes['stripes']} />
        <span className={classes['orbit']} />
        <span className={classes['puck']} />
        <span className={classes['spark']} />
        <span className={classes['squiggle']} />
      </span>
      <span className={classes['label']}>{children}</span>
    </button>
  );
}
