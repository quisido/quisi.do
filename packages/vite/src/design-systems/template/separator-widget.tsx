import type { ReactElement } from 'react';
import type { SeparatorWidgetProps } from '../core/separator-widget-props.js';
import classes from './separator-widget.module.scss';

const DEFAULT_MAX = 100;

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
  disabled,
  max = DEFAULT_MAX,
  min = 0,
  orientation = 'horizontal',
  value,
}: SeparatorWidgetProps): ReactElement {
  return (
    <hr
      aria-disabled={disabled}
      aria-orientation={orientation}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      className={classes['separator-widget']}
      role="separator"
    />
  );
}
