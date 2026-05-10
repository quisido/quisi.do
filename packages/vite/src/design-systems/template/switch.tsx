import type { ChangeEvent, ReactElement } from 'react';
import type { SwitchProps } from '../core/switch-props.js';
import classes from './switch.module.scss';

/**
 * A switch is a type of checkbox that represents on/off values, as opposed to
 * checked/unchecked values.
 * A switch provides approximately the same functionality as a checkbox and
 * toggle button, but makes it possible for assistive technologies to present
 * the widget in a fashion consistent with its on-screen appearance.
 * @see {@link https://w3c.github.io/aria/#switch | WAI-ARIA `switch` role}
 */
export default function Switch({
  label,
  on,
  onToggle,
}: SwitchProps): ReactElement {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    onToggle(ev.currentTarget.checked);
  };

  return (
    <label className={classes['root']}>
      <span className={classes['label']}>{label}</span>
      <input
        aria-checked={on}
        checked={on}
        className={classes['switch']}
        onChange={handleChange}
        role="switch"
        type="checkbox"
      />
    </label>
  );
}
