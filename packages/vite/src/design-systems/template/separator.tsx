import type { ReactElement } from 'react';
import type { SeparatorProps } from '../core/separator-props.js';
import classes from './separator.module.scss';

/**
 *   A separator structure provides a visible boundary that separates and
 * distinguishes sections of content or groups of menu items.
 *   For example, a static separator can be used to help visually divide two
 * groups of menu items in a menu or to provide a horizontal rule between two
 * sections of a page.
 *@see {@link https://w3c.github.io/aria/#separator | WAI-ARIA `separator` role}
 */
export default function Separator({
  orientation,
}: SeparatorProps): ReactElement {
  return (
    <hr
      aria-orientation={orientation}
      className={classes['separator']}
      role="separator"
    />
  );
}
