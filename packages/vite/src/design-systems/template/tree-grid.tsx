import type { ReactElement } from 'react';
import type { TreeGridProps, TreeGridRow } from '../core/tree-grid-props.js';
import type { RowCell } from '../core/row-props.js';

/**
 *   A tree grid...
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
