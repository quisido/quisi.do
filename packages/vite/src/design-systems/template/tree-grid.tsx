import type { Attributes, ReactElement } from 'react';
import type { TreeGridProps } from '../core/tree-grid-props.js';
import type { RowProps } from '../core/row-props.js';
import type { CellProps } from '../core/cell-props.js';

/**
 *   A `TreeGrid` component is a `Grid` whose rows can be expanded and
 * collapsed in the same manner as a `Tree`.
 */
export default function TreeGrid({
  caption,
  rows,
}: TreeGridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table role="treegrid">
      <caption>{caption}</caption>
      {rows.map(
        ({
          cells,
          key: rowKey,
        }: RowProps & Required<Attributes>): ReactElement => (
          <tr key={rowKey} role="row">
            {cells.map(
              ({
                children,
                key: cellKey,
              }: CellProps & Required<Attributes>): ReactElement => (
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
