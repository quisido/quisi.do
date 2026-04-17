import type { ReactElement } from 'react';
import type { RowCell } from '../core/row-props.js';
import type { TableProps, TableRow } from '../core/table-props.js';
import classes from './table.module.scss';

/**
 *   A table... A section containing data arranged in rows and columns. See related grid.

The table role is intended for tabular containers which are not interactive. If the tabular container maintains a selection state, provides its own two-dimensional navigation, or allows the user to rearrange or otherwise manipulate its contents or the display thereof, authors SHOULD use grid or treegrid instead.

Authors SHOULD provide an accessible name for a table, which can be done with the aria-label or aria-labelledby attribute. Authors SHOULD reference a visible label with aria-labelledby if a visible label is present for the table.

Authors SHOULD prefer the use of the host language's semantics for table whenever possible, such as the <table> element in HTML.
 * @see {@link https://w3c.github.io/aria/#table | WAI-ARIA `table` role}
 */
export default function Table({ caption, rows }: TableProps): ReactElement {
  return (
    <table className={classes['table']} role="table">
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
