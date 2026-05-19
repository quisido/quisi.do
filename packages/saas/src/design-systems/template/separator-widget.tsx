import type { KeyboardEvent, ReactElement } from 'react';
import type { SeparatorWidgetProps } from '../core/separator-widget-props.js';
import classes from './separator-widget.module.scss';

const DEFAULT_MAX = 100;
const STEP = 1;

/**
 * A separator widget is interactive widget that separates and distinguishes
 * sections of content or groups of menu items. It is also moveable.
 * A separator widget both provides a visible boundary between two sections of
 * content and enables the user to change the relative size of the sections by
 * changing the position of the separator. A variable separator widget can be
 * moved continuously within a range, whereas a fixed separator widget supports
 * only two discrete positions. Typically, a fixed separator widget is used to
 * toggle one of the sections between expanded and collapsed states.
 * Set a separator's `value` prop to a number reflecting the current position
 * of the separator.
 *@see {@link https://w3c.github.io/aria/#separator | WAI-ARIA `separator` role}
 */
export default function SeparatorWidget({
  disabled = false,
  label,
  labelledBy,
  max = DEFAULT_MAX,
  min = 0,
  onChange,
  orientation = 'horizontal',
  value,
  valueText,
}: SeparatorWidgetProps): ReactElement {
  if (value < min) {
    throw new Error(
      `A separator's value cannot be less than its minimum: ${value} < ${min}`,
    );
  }

  if (value > max) {
    throw new Error(
      `A separator's value cannot be greater than its maximum: ${value} > ${max}`,
    );
  }

  const changeValue = (offset: number): void => {
    if (disabled || onChange === undefined) {
      return;
    }

    const nextValue: number = Math.min(max, Math.max(min, value + offset));
    onChange(nextValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLHRElement>): void => {
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
    <hr
      aria-disabled={disabled}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-orientation={orientation}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={valueText}
      className={classes['separator-widget']}
      onKeyDown={handleKeyDown}
      role="separator"
      tabIndex={((): -1 | 0 => {
        if (disabled) {
          return -1;
        }
        return 0;
      })()}
    />
  );
}
