import type { ReactElement } from 'react';
import type { TreeProps, TreeRow } from '../core/tree-props.js';
import type { RowCell } from '../core/row-props.js';

/**
 *   A tree...
 * @see {@link https://w3c.github.io/aria/#tree | WAI-ARIA `tree` role}
 */
export default function Tree({ caption, rows }: TreeProps): ReactElement {
  return (
    <table role="tree">
      <caption>{caption}</caption>
      {rows.map(
        ({ cells, key: rowKey }: TreeRow): ReactElement => (
          <tr key={rowKey} role="row">
            {cells.map(
              ({ children, key: cellKey }: RowCell): ReactElement => (
                <td key={cellKey} role="cell">
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
