import type { Attributes, ReactElement } from 'react';
import type { RowProps } from '../core/row-props.js';
import type { CellProps } from '../core/cell-props.js';
import type { TableProps } from '../core/table-props.js';

/**
 *   A `Table` component contains data arranged in rows and columns. Use
 * `Grid` or `TreeGrid` instead when the container is interactive or manages
 * its own selection and navigation behavior.
 */
export default function Table({ caption, rows }: TableProps): ReactElement {
  return (
    <table>
      <caption>{caption}</caption>
      <tbody>
        {rows.map(
          ({
            cells,
            key: rowKey,
          }: RowProps & Required<Attributes>): ReactElement => (
            <tr key={rowKey}>
              {cells.map(
                ({
                  children,
                  key: cellKey,
                }: CellProps & Required<Attributes>): ReactElement => (
                  <td key={cellKey}>{children}</td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
