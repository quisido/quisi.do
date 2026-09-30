import { type ReactElement } from 'react';

import {
  type TableCell,
  type TableProps,
  type TableRow,
} from '../core/table-props.js';
import useTable from '../core/use-table.js';
import classes from './table.module.scss';

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
      <caption className={classes['caption']} id={captionId}>
        <span className={classes['caption-text']}>{caption}</span>
        <span aria-hidden="true" className={classes['caption-dots']} />
      </caption>
      <tbody className={classes['body']}>
        {rows.map(
          ({ cells, key: rowKey }: TableRow, rowIndex): ReactElement => (
            <tr className={classes['row']} key={rowKey} role="row">
              {cells.map(
                (
                  { content, key: cellKey }: TableCell,
                  cellIndex,
                ): ReactElement => (
                  <td className={classes['cell']} key={cellKey} role="cell">
                    <span className={classes['cell-content']}>{content}</span>
                    {cellIndex === 0 && (
                      <span
                        aria-hidden="true"
                        className={classes['row-mark']}
                        data-shape={rowIndex % 4}
                      />
                    )}
                  </td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
