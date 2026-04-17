import type { ChangeEvent, ReactElement } from 'react';
import type { SliderProps } from '../core/slider-props.js';
import classes from './slider.module.scss';

const DEFAULT_MAX = 100;

/**
 *   A slider is an input where the user selects a value from within a given
 * range.
 *   A slider represents the current value and range of possible values via the
 * size of the slider and position of the thumb. It is typically possible to add
 * to or subtract from the current value by using directional keys such as arrow
 * keys.
 * @see {@link https://w3c.github.io/aria/#slider | WAI-ARIA `slider` role}
 */
export default function Slider({
  label,
  max = DEFAULT_MAX,
  min = 0,
  onChange,
  orientation = 'horizontal',
  value,
}: SliderProps): ReactElement {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextValue: number = parseFloat(event.currentTarget.value);
    if (isNaN(nextValue)) {
      return;
    }

    onChange(nextValue);
  };

  return (
    <label className={classes['slider']}>
      <span className={classes['label']}>{label}</span>
      <input
        aria-orientation={orientation}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className={classes['input']}
        max={max}
        min={min}
        onChange={handleChange}
        role="slider"
        type="range"
        value={value}
      />
    </label>
  );
}
