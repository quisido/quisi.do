import {
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import type {
  TreeGridCell,
  TreeGridProps,
  TreeGridRow,
} from '../core/tree-grid-props.js';
import classes from './tree-grid.module.scss';

const getGridCellTabIndex = (rowIndex: number, cellIndex: number): number => {
  if (rowIndex === 0 && cellIndex === 0) {
    return 0;
  }

  return -1;
};

/**
 * A tree grid is a grid with rows that can be expanded and collapsed in the
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
  const treeGridRef = useRef<HTMLTableElement>(null);
  const lastRowIndex: number = rows.length - 1;
  const lastCellIndexes: readonly number[] = useMemo(
    (): readonly number[] =>
      rows.map(({ cells }: TreeGridRow): number => cells.length - 1),
    [rows],
  );

  const focusCell = useCallback((rowIndex: number, cellIndex: number): void => {
    const rowElements: HTMLElement[] = Array.from(
      treeGridRef.current?.querySelectorAll<HTMLElement>('[role="row"]') ?? [],
    );
    const rowElement: HTMLElement | undefined = rowElements[rowIndex];
    const cellElements: HTMLElement[] = Array.from(
      rowElement?.querySelectorAll<HTMLElement>('[role="gridcell"]') ?? [],
    );
    const cellElement: HTMLElement | undefined = cellElements[cellIndex];

    if (cellElement === undefined) {
      return;
    }

    for (const element of rowElements.flatMap(
      (row: HTMLElement): HTMLElement[] =>
        Array.from(row.querySelectorAll<HTMLElement>('[role="gridcell"]')),
    )) {
      if (element === cellElement) {
        element.tabIndex = 0;
      } else {
        element.tabIndex = -1;
      }
    }

    cellElement.focus();
  }, []);

  const handleGridCellKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTableCellElement>): void => {
      const { cellIndex: cellIndexValue, rowIndex: rowIndexValue } =
        event.currentTarget.dataset;
      const cellIndex: number = Number(cellIndexValue);
      const rowIndex: number = Number(rowIndexValue);

      if (!Number.isInteger(rowIndex) || !Number.isInteger(cellIndex)) {
        return;
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          focusCell(rowIndex + 1, cellIndex);
          break;
        }

        case 'ArrowLeft': {
          event.preventDefault();
          focusCell(rowIndex, cellIndex - 1);
          break;
        }

        case 'ArrowRight': {
          event.preventDefault();
          focusCell(rowIndex, cellIndex + 1);
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          focusCell(rowIndex - 1, cellIndex);
          break;
        }

        case 'End': {
          event.preventDefault();

          if (event.ctrlKey) {
            focusCell(lastRowIndex, lastCellIndexes[lastRowIndex] ?? -1);
          } else {
            focusCell(rowIndex, lastCellIndexes[rowIndex] ?? -1);
          }
          break;
        }

        case 'Home': {
          event.preventDefault();

          if (event.ctrlKey) {
            focusCell(0, 0);
          } else {
            focusCell(rowIndex, 0);
          }
          break;
        }

        default: {
          break;
        }
      }
    },
    [focusCell, lastCellIndexes, lastRowIndex],
  );

  return (
    <table
      aria-readonly={isTreeGridReadOnly}
      className={classes['tree-grid']}
      ref={treeGridRef}
      role="treegrid"
    >
      <caption className={classes['caption']}>{caption}</caption>
      <tbody role="rowgroup">
        {rows.map(
          (
            { cells, expanded: isRowExpanded, key: rowKey }: TreeGridRow,
            rowIndex,
          ): ReactElement => (
            <tr
              aria-expanded={isRowExpanded}
              className={classes['row']}
              key={rowKey}
              role="row"
            >
              {cells.map(
                (
                  {
                    content,
                    expanded: isCellExpanded,
                    key: cellKey,
                    /**
                     * `readOnly: false` on a focusable cell indicates that the
                     * cell is editable.
                     */
                    readOnly: isGridCellReadOnly = isTreeGridReadOnly,
                  }: TreeGridCell,
                  cellIndex,
                ): ReactElement => (
                  <td
                    aria-expanded={isCellExpanded}
                    aria-readonly={isGridCellReadOnly}
                    className={classes['cell']}
                    data-cell-index={cellIndex}
                    data-row-index={rowIndex}
                    key={cellKey}
                    onKeyDown={handleGridCellKeyDown}
                    role="gridcell"
                    tabIndex={getGridCellTabIndex(rowIndex, cellIndex)}
                  >
                    {content}
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
