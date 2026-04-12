import type { ReactElement } from 'react';
import type { RowCell } from '../core/row-props.js';
import type { TableProps, TableRow } from '../core/table-props.js';

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
          ({ cells, key: rowKey }: TableRow): ReactElement => (
            <tr key={rowKey}>
              {cells.map(
                ({ children, key: cellKey }: RowCell): ReactElement => (
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
