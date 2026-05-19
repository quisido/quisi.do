import {
  type Key,
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import type { GridCell, GridProps, GridRow } from '../core/grid-props.js';
import useElementId from '../../hooks/use-element-id.js';
import classes from './grid.module.scss';

const EMPTY_MAP: ReadonlyMap<Key, never> = new Map<Key, never>();
const EMPTY_SET: ReadonlySet<never> = new Set<never>();

const getGridCellTabIndex = (rowIndex: number, cellIndex: number): number => {
  if (rowIndex === 0 && cellIndex === 0) {
    return 0;
  }

  return -1;
};

const getGridCellSelected = (
  selected: GridProps['selected'],
  isSelected: boolean,
): boolean | undefined => {
  if (selected === undefined) {
    return undefined;
  }

  return isSelected;
};

const getGridMultiSelectable = (
  selected: GridProps['selected'],
): true | undefined => {
  if (selected instanceof Map) {
    return true;
  }

  return undefined;
};

/**
 * A grid is a composite widget containing a collection of one or more rows
 * with one or more cells where some or all cells in the grid are focusable by
 * using methods of two-dimensional navigation.
 * A grid does not imply a specific visual, e.g. tabular. It describes
 * relationships among elements. It can be used for purposes as simple as
 * grouping a collection of checkboxes or navigation links or as complex as
 * creating a full-featured spreadsheet application.
 * @see {@link https://w3c.github.io/aria/#grid | WAI-ARIA `grid` role}
 */
export default function Grid({
  caption,
  readOnly,
  rows,
  selected,
}: GridProps): ReactElement {
  const captionId: string = useElementId();
  const gridRef = useRef<HTMLTableElement>(null);

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

  const focusCell = useCallback((rowIndex: number, cellIndex: number): void => {
    const rowElements: HTMLElement[] = Array.from(
      gridRef.current?.querySelectorAll<HTMLElement>('[role="row"]') ?? [],
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
    (
      event: KeyboardEvent<HTMLTableCellElement>,
      rowIndex: number,
      cellIndex: number,
    ): void => {
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

        default: {
          break;
        }
      }
    },
    [focusCell],
  );

  return (
    <table
      aria-readonly={readOnly}
      aria-labelledby={captionId}
      aria-multiselectable={getGridMultiSelectable(selected)}
      className={classes['grid']}
      ref={gridRef}
      role="grid"
    >
      <caption id={captionId}>{caption}</caption>
      <tbody role="rowgroup">
        {rows.map(({ cells, key: rowKey }: GridRow, rowIndex): ReactElement => {
          const selectedCells: ReadonlySet<Key> =
            selectedMap.get(rowKey) ?? EMPTY_SET;
          return (
            <tr key={rowKey} role="row">
              {cells.map(
                (
                  { content, key: cellKey }: GridCell,
                  cellIndex,
                ): ReactElement => {
                  /**
                   * A grid cell can be focusable, editable, and selectable. A
                   * grid cell can have relationships such as aria-controls to
                   * address the application of functional relationships.
                   * If an author intends a grid cell to have a row header, column
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
                      aria-selected={getGridCellSelected(selected, isSelected)}
                      key={cellKey}
                      onKeyDown={(
                        event: KeyboardEvent<HTMLTableCellElement>,
                      ): void => {
                        handleGridCellKeyDown(event, rowIndex, cellIndex);
                      }}
                      role="gridcell"
                      tabIndex={getGridCellTabIndex(rowIndex, cellIndex)}
                    >
                      {content}
                    </td>
                  );
                },
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
