import type { ReactElement } from 'react';
import type { ToolbarProps } from '../core/toolbar-props.js';
import classes from './toolbar.module.scss';

/**
 *   A toolbar... A collection of commonly used function buttons or controls represented in compact visual form.

The toolbar is often a subset of functions found in a menubar, designed to reduce user effort in using these functions. Authors MUST supply a label on each toolbar when the application contains more than one toolbar.

Authors MAY manage focus of descendants for all instances of this role, as described in Managing Focus.

Elements with the role toolbar have an implicit aria-orientation value of horizontal.
 * @see {@link https://w3c.github.io/aria/#toolbar | WAI-ARIA `toolbar` role}
 */
export default function Toolbar({
  children,
  label,
  labelledBy,
  orientation = 'horizontal',
}: ToolbarProps): ReactElement {
  /**
   * Technical debt: Implement keyboard navigation for toolbars.
   * Acceptance criteria:
   * - Tab and Shift + Tab: Move focus into and out of the toolbar. When focus
   *   moves into a toolbar:
   *   - If focus is moving into the toolbar for the first time, focus is set on
   *     the first control that is not disabled.
   *   - If the toolbar has previously contained focus, focus is optionally set
   *     on the control that last had focus. Otherwise, it is set on the first
   *     control that is not disabled.
   * - For a horizontal toolbar (the default):
   *   - Left Arrow: Moves focus to the previous control. Optionally, focus
   *     movement may wrap from the first element to the last element.
   *   - Right Arrow: Moves focus to the next control. Optionally, focus
   *     movement may wrap from the last element to the first element.
   * - For a vertical toolbar:
   *   - Down Arrow: Performs as Right Arrow is described above.
   *   - Up Arrow: Performs as Left Arrow is described above.
   * - Home (Optional): Moves focus to first element.
   * - End (Optional): Moves focus to last element.
   */
  return (
    <div
      className={classes['root']}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-orientation={orientation}
      role="toolbar"
    >
      {children}
    </div>
  );
}
