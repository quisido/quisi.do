import type { ReactElement } from 'react';
import type { TableCell, TableProps, TableRow } from '../core/table-props.js';
import classes from './table.module.scss';
import useTable from '../core/use-table.js';

/**
 * A table is a section containing data arranged in rows and columns. See
 * related grid.
 * A table is intended for tabular containers which are not interactive. If
 * the tabular container maintains a selection state, provides its own
 * two-dimensional navigation, or allows the user to rearrange or otherwise
 * manipulate its contents or the display thereof, use grid or tree grid
 * instead.
 * @see {@link https://w3c.github.io/aria/#table | WAI-ARIA `table` role}
 */
export default function Table({ caption, rows }: TableProps): ReactElement {
  const { captionId } = useTable();

  return (
    <table
      aria-labelledby={captionId}
      className={classes['table']}
      role="table"
    >
      <caption id={captionId}>{caption}</caption>
      <tbody>
        {rows.map(({ cells, key: rowKey }: TableRow): ReactElement => (
          <tr className={classes['row']} key={rowKey} role="row">
            {cells.map(({ content, key: cellKey }: TableCell): ReactElement => (
              <td className={classes['cell']} key={cellKey} role="cell">
                {content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
