import { type Key, type ReactElement, useMemo } from 'react';
import type { GridProps, GridRow } from '../core/grid-props.js';
import type { RowCell } from '../core/row-props.js';
import useElementId from '../../hooks/use-element-id.js';

const EMPTY_MAP: ReadonlyMap<Key, never> = new Map<Key, never>();
const EMPTY_SET: ReadonlySet<never> = new Set<never>();

/**
 *   A grid is a composite widget containing a collection of one or more rows
 * with one or more cells where some or all cells in the grid are focusable by
 * using methods of two-dimensional navigation.
 *   A grid does not imply a specific visual, e.g. tabular. It describes
 * relationships among elements. It can be used for purposes as simple as
 * grouping a collection of checkboxes or navigation links or as complex as
 * creating a full-featured spreadsheet application.
 * @see {@link https://w3c.github.io/aria/#grid | WAI-ARIA `grid` role}
 */
export default function Grid({
  caption,
  readOnly = false,
  rows,
  selected,
}: GridProps): ReactElement {
  const captionId: string = useElementId();

  const selectedMap = useMemo((): ReadonlyMap<Key, ReadonlySet<Key>> => {
    if (selected === undefined) {
      return EMPTY_MAP;
    }

    if (selected instanceof Array) {
      const [rowKey, cellKey] = selected;
      return new Map([[rowKey, new Set([cellKey])]]);
    }

    return selected;
  }, [selected]);

  return (
    <table
      aria-readonly={readOnly}
      aria-labelledby={captionId}
      aria-multiselectable={selected instanceof Map}
      role="grid"
    >
      <caption id={captionId}>{caption}</caption>
      {rows.map(({ cells, key: rowKey }: GridRow): ReactElement => {
        const selectedCells: ReadonlySet<Key> =
          selectedMap.get(rowKey) ?? EMPTY_SET;
        return (
          <tr key={rowKey} role="row">
            {cells.map(({ children, key: cellKey }: RowCell): ReactElement => {
              /**
               *   A grid cell can be focusable, editable, and selectable. A
               * grid cell can have relationships such as aria-controls to
               * address the application of functional relationships.
               *   If an author intends a grid cell to have a row header, column
               * header, or both, and if the relevant headers cannot be
               * determined from the DOM structure, authors SHOULD explicitly
               * indicate which header cells are relevant to the grid cell by
               * applying aria-describedby on the grid cell and referencing
               * elements with role rowheader or columnheader.
               */
              const isSelected: boolean = selectedCells.has(cellKey);
              return (
                <td
                  aria-readonly={readOnly}
                  aria-selected={isSelected}
                  key={cellKey}
                  role="gridcell"
                >
                  {children}
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
}
