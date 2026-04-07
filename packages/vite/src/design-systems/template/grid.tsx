import type { Attributes, ReactElement } from 'react';
import type { GridProps } from '../core/grid-props.js';
import type { CellProps } from '../core/cell-props.js';
import type { RowProps } from '../core/row-props.js';

/**
 *   A `Grid` component is a composite widget containing rows and cells where
 * some or all cells are focusable through two-dimensional navigation. It
 * describes relationships among elements and does not require a tabular visual
 * presentation.
 */
export default function Grid({ caption, rows }: GridProps): ReactElement {
  /**
   *   Focus MUST be managed on this container role.
   */
  return (
    <table role="grid">
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
