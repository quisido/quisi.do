import type { ReactElement } from 'react';
import type { TreeItem, TreeProps } from '../core/tree-props.js';
import type { RowCell } from '../core/row-props.js';
import classes from './tree.module.scss';

/**
 *   A tree... A widget that allows the user to select one or more items from a hierarchically organized collection.

To be keyboard accessible, authors SHOULD manage focus of descendants for all instances of this role, as described in Managing Focus.

Elements with the role tree have an implicit aria-orientation value of vertical.
 * @see {@link https://w3c.github.io/aria/#tree | WAI-ARIA `tree` role}
 * @see {@link https://w3c.github.io/aria/#treeitem | WAI-ARIA `treeitem` role}
 */
export default function Tree({
  caption,
  items,
  orientation = 'vertical',
  required = false,
}: TreeProps): ReactElement {
  return (
    <table
      className={classes['root']}
      aria-orientation={orientation}
      aria-required={required}
      role="tree"
    >
      <caption>{caption}</caption>
      {items.map(
        ({ cells, key: rowKey }: TreeItem): ReactElement => (
          <tr key={rowKey} role="row">
            {cells.map(
              ({ children, key: cellKey }: RowCell): ReactElement => (
                <td key={cellKey} role="cell">
                  {children}
                </td>
              ),
            )}
          </tr>
        ),
      )}
    </table>
  );
}
