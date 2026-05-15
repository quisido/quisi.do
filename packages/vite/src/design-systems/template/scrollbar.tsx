import type { KeyboardEvent, ReactElement } from 'react';
import type { ScrollbarProps } from '../core/scrollbar-props.js';
import classes from './scrollbar.module.scss';

const DEFAULT_MAX = 100;
const STEP = 1;

/**
 * A scrollbar is a graphical object that controls the scrolling of content
 * within a viewing area, regardless of whether the content is fully displayed
 * within the viewing area.
 * A scrollbar represents the current value and range of possible values via
 * the size of the scrollbar and position of the thumb with respect to the
 * visible range of the orientation (horizontal or vertical) it controls. Its
 * orientation represents the orientation of the scrollbar and the scrolling
 * effect on the viewing area controlled by the scrollbar. It is typically
 * possible to add to or subtract from the current value by using directional
 * keys such as arrow keys.
 * @see {@link https://w3c.github.io/aria/#scrollbar | WAI-ARIA `scrollbar` role}
 */
export default function Scrollbar({
  controls,
  disabled = false,
  max = DEFAULT_MAX,
  min = 0,
  onChange,
  orientation = 'vertical',
  value,
  valueText,
}: ScrollbarProps): ReactElement {
  if (value < min) {
    throw new Error(
      `A scrollbar's value cannot be less than its minimum: ${value} < ${min}`,
    );
  }

  if (value > max) {
    throw new Error(
      `A scrollbar's value cannot be greater than its maximum: ${value} > ${max}`,
    );
  }

  const changeValue = (offset: number): void => {
    if (disabled || onChange === undefined) {
      return;
    }

    const nextValue: number = Math.min(max, Math.max(min, value + offset));
    onChange(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key) {
      case 'ArrowDown': {
        if (orientation === 'vertical') {
          event.preventDefault();
          changeValue(STEP);
        }
        break;
      }

      case 'ArrowLeft': {
        if (orientation === 'horizontal') {
          event.preventDefault();
          changeValue(-STEP);
        }
        break;
      }

      case 'ArrowRight': {
        if (orientation === 'horizontal') {
          event.preventDefault();
          changeValue(STEP);
        }
        break;
      }

      case 'ArrowUp': {
        if (orientation === 'vertical') {
          event.preventDefault();
          changeValue(-STEP);
        }
        break;
      }
    }
  };

  return (
    <div
      aria-controls={controls}
      aria-disabled={disabled}
      aria-orientation={orientation}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={valueText}
      className={classes['scrollbar']}
      onKeyDown={handleKeyDown}
      role="scrollbar"
      tabIndex={((): -1 | 0 => {
        if (disabled) {
          return -1;
        }
        return 0;
      })()}
    />
  );
}
