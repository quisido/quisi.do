import { type ChangeEvent, type CSSProperties, type ReactElement } from 'react';

import { type SliderProps } from '../core/slider-props.js';
import classes from './slider.module.scss';

const DEFAULT_MAX = 100;

/**
 * A slider is an input where the user selects a value from within a given
 * range.
 * A slider represents the current value and range of possible values via the
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
  const range: number = max - min;
  const progress: number = range === 0 ? 0 : ((value - min) / range) * 100;
  const sliderStyle = {
    '--slider-progress': `${Math.min(100, Math.max(0, progress))}%`,
  } as CSSProperties;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextValue: number = parseFloat(event.currentTarget.value);
    if (isNaN(nextValue)) {
      return;
    }

    onChange(nextValue);
  };

  return (
    <label
      className={classes['root']}
      data-orientation={orientation}
      style={sliderStyle}
    >
      <span aria-hidden="true" className={classes['piano']} />
      <span aria-hidden="true" className={classes['sun']} />
      <span aria-hidden="true" className={classes['triangle']} />
      <span className={classes['header']}>
        <span className={classes['label']}>{label}</span>
        <span aria-hidden="true" className={classes['value']}>
          {value}
        </span>
      </span>
      <span className={classes['stage']}>
        <span aria-hidden="true" className={classes['squiggle']} />
        <input
          aria-orientation={orientation}
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
          className={classes['slider']}
          max={max}
          min={min}
          onChange={handleChange}
          role="slider"
          type="range"
          value={value}
        />
        <span aria-hidden="true" className={classes['ticks']} />
      </span>
      <span aria-hidden="true" className={classes['checker']} />
    </label>
  );
}
