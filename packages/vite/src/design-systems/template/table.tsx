import type { ReactElement } from 'react';
import type { RowCell } from '../core/row-props.js';
import type { TableProps, TableRow } from '../core/table-props.js';

/**
 *   A table...
 * @see {@link https://w3c.github.io/aria/#table | WAI-ARIA `table` role}
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
