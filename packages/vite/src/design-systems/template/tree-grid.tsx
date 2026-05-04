import type { ReactElement } from 'react';
import type {
  TreeGridCell,
  TreeGridProps,
  TreeGridRow,
} from '../core/tree-grid-props.js';
import classes from './tree-grid.module.scss';

/**
 *   A tree grid is a grid with rows that can be expanded and collapsed in the
 * same manner as for a tree.

In a treegrid that provides content editing functions, if the content of a focusable gridcell element is not editable, authors MAY set aria-readonly to true on the gridcell element. However, if a treegrid presents a collection of elements that do not support aria-readonly, such as a collection of link elements, it is not necessary for the author to specify a value for aria-readonly.

To be keyboard accessible, authors SHOULD manage focus of descendants for all instances of this role, as described in Managing Focus.
 * @see {@link https://w3c.github.io/aria/#treegrid | WAI-ARIA `treegrid` role}
 */
export default function TreeGrid({
  caption,
  readOnly: isTreeGridReadOnly = true,
  rows,
}: TreeGridProps): ReactElement {
  return (
    <table
      aria-readonly={isTreeGridReadOnly}
      className={classes['tree-grid']}
      role="treegrid"
    >
      <caption className={classes['caption']}>{caption}</caption>
      {rows.map(
        ({ cells, expanded, key: rowKey }: TreeGridRow): ReactElement => (
          <tr
            aria-expanded={expanded}
            className={classes['row']}
            key={rowKey}
            role="row"
          >
            {cells.map(
              ({
                content,
                expanded,
                key: cellKey,
                /**
                 * `readOnly: false` on a focusable cell indicates that the
                 * cell is editable.
                 */
                readOnly: isGridCellReadOnly = isTreeGridReadOnly,
              }: TreeGridCell): ReactElement => (
                <td
                  aria-expanded={expanded}
                  aria-readonly={isGridCellReadOnly}
                  className={classes['cell']}
                  key={cellKey}
                  role="gridcell"
                >
                  {content}
                </td>
              ),
            )}
          </tr>
        ),
      )}
    </table>
  );
}
