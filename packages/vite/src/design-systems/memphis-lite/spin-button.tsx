import type { ChangeEvent, ReactElement } from 'react';
import type { SpinButtonProps } from '../core/spin-button-props.js';
import classes from './spin-button.module.scss';

/**
 *   A spin button is a form of range that expects the user to select from among
 * discrete choices.
 *   A spin button typically allows users to change its displayed value by
 * activating increment and decrement buttons that step through a set of allowed
 * values. Some implementations display the value in an text field that allows
 * editing and typing but typically limits input in ways that help prevent
 * invalid values.
 *   Although a spin button is similar in appearance to many presentations of
 * select, it is advisable to use a spin button when working with known ranges
 * (especially in the case of large ranges) as opposed to distinct options. For
 * example, a spin button representing a range from 1 to 1,000,000 would provide
 * much better performance than a select widget representing the same values.
 * @see {@link https://w3c.github.io/aria/#spinbutton | WAI-ARIA `spinbutton` role}
 */
export default function SpinButton({
  label,
  max,
  min,
  name,
  onChange,
  step,
  value,
}: SpinButtonProps): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue: number = parseFloat(event.target.value);
    if (isNaN(newValue)) {
      return;
    }

    onChange(newValue);
  };

  return (
    <label className={classes['root']}>
      {label}
      <input
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        max={max}
        min={min}
        name={name}
        role="spinbutton"
        onChange={handleChange}
        step={step}
        type="number"
        value={value}
      />
    </label>
  );
}
