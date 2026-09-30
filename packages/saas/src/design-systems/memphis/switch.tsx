import { type ChangeEvent, type ReactElement } from 'react';

import { type SwitchProps } from '../core/switch-props.js';
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
      <input
        aria-checked={on}
        checked={on}
        className={classes['switch']}
        onChange={handleChange}
        role="switch"
        type="checkbox"
      />
      <span aria-hidden="true" className={classes['art']}>
        <span className={classes['shadow']} />
        <span className={classes['track']}>
          <span className={classes['dots']} />
          <span className={classes['bolt']} />
          <span className={classes['triangle']} />
          <span className={classes['sun']} />
          <span className={classes['thumb']} />
        </span>
        <span className={classes['state']}>
          <span className={classes['off']}>OFF</span>
          <span className={classes['on']}>ON</span>
        </span>
      </span>
      <span className={classes['label']}>{label}</span>
    </label>
  );
}
