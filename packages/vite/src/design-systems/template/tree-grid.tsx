import type { ReactElement } from 'react';
import type { TreeGridProps, TreeGridRow } from '../core/tree-grid-props.js';
import type { RowCell } from '../core/row-props.js';

/**
 *   A tree grid... A grid whose rows can be expanded and collapsed in the same manner as for a tree.

If aria-readonly is set on an element with role treegrid, user agents MUST propagate the value to all gridcell elements that are accessibility descendants of the treegrid and expose the value in the accessibility API. An author MAY override the propagated value of aria-readonly for an individual gridcell element.

When the aria-readonly attribute is applied to a focusable gridcell, it indicates whether the content contained in the gridcell is editable. The aria-readonly attribute does not represent availability of functions for navigating or manipulating the treegrid itself.

In a treegrid that provides content editing functions, if the content of a focusable gridcell element is not editable, authors MAY set aria-readonly to true on the gridcell element. However, if a treegrid presents a collection of elements that do not support aria-readonly, such as a collection of link elements, it is not necessary for the author to specify a value for aria-readonly.

To be keyboard accessible, authors SHOULD manage focus of descendants for all instances of this role, as described in Managing Focus.
 * @see {@link https://w3c.github.io/aria/#treegrid | WAI-ARIA `treegrid` role}
 */
export default function TreeGrid({
  caption,
  rows,
}: TreeGridProps): ReactElement {
  return (
    <table role="treegrid">
      <caption>{caption}</caption>
      {rows.map(
        ({ cells, key: rowKey }: TreeGridRow): ReactElement => (
          <tr key={rowKey} role="row">
            {cells.map(
              ({ children, key: cellKey }: RowCell): ReactElement => (
                /**
                 *  In a tree grid, authors MAY define a grid cell as expandable
                 * by using the aria-expanded attribute. If the aria-expanded
                 * attribute is provided, it applies only to the individual
                 * cell. It is not a proxy for the container row, which also can
                 * be expanded. The main use case for providing this attribute
                 * on a gridcell is pivot table behavior.
                 */
                <td key={cellKey} role="gridcell">
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
