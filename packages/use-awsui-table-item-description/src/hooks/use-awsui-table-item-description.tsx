import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TableProps } from '@awsui/components-react/table';
import type {
  Attributes,
  ComponentType,
  MutableRefObject,
  ReactElement,
} from 'react';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import mapRefToTbody from '../utils/map-ref-to-tbody.js';
import mapRowToCellClassName from '../utils/map-row-to-cell-class-name.js';
import mapRowsToCellBorderBottomWidth from '../utils/map-rows-to-cell-border-bottom-width.js';

export interface UseAwsuiTableItemDescriptionProps<Item> {
  readonly Component?: ComponentType<Item> | undefined;
  readonly colSpan: number;
  readonly items: readonly Item[];
  readonly ref: Readonly<MutableRefObject<HTMLElement | null>>;
  readonly onRowClick?: (
    event: Readonly<
      NonCancelableCustomEvent<Readonly<TableProps.OnRowClickDetail<Item>>>
    >,
  ) => void;
}

export default function useAwsuiTableItemDescription<Item extends Attributes>({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  colSpan,
  onRowClick,
  items,
  ref,
}: UseAwsuiTableItemDescriptionProps<Item>): ComponentType<
  Record<string, never>
> {
  // States
  const descriptionCells: HTMLTableCellElement[] =
    useMemo((): HTMLTableCellElement[] => {
      const newDescriptionCells: HTMLTableCellElement[] = [];
      const itemsCount: number = items.length;
      for (let i = 0; i < itemsCount; i++) {
        newDescriptionCells.push(document.createElement('td'));
      }
      return newDescriptionCells;
      // Even though we only need `items.length`, we want to regenerate these
      //   `<td>`s every time `items` changes, because it means the table has
      //   removed the previous elements and appended new `<tr>`s.
    }, [items]);

  // Effects
  useLayoutEffect((): VoidFunction | undefined => {
    if (typeof Component === 'undefined') {
      return;
    }

    const tbody: HTMLTableSectionElement | null = mapRefToTbody(ref);
    if (tbody === null) {
      return;
    }

    const rows: HTMLCollectionOf<HTMLTableRowElement> =
      tbody.getElementsByTagName('tr');

    const cellBorderBottomWidth: string | null =
      mapRowsToCellBorderBottomWidth(rows);
    if (cellBorderBottomWidth === null) {
      return;
    }

    const descriptionRows: HTMLTableRowElement[] = [];
    const itemCells: HTMLTableCellElement[] = [];

    const itemsCount: number = items.length;
    let rowIndexOffset = 0;
    for (let itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
      const rowIndex: number = itemIndex + rowIndexOffset;
      const itemRow: HTMLTableRowElement | null = rows.item(rowIndex);

      // We ignore this line, because it should never happen. and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (itemRow === null) {
        throw new Error(
          `Expected a table row at index ${rowIndex} for item index ${itemIndex}.`,
        );
      }

      const cellClassName: string | null = mapRowToCellClassName(itemRow);

      // We ignore this line, because it should never happen, and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (cellClassName === null) {
        continue;
      }

      const descriptionCell: HTMLTableCellElement | undefined =
        descriptionCells[itemIndex];

      // We ignore this line, because it should never happen, and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (typeof descriptionCell === 'undefined') {
        throw new Error(
          `Expected to find a description cell for item index ${itemIndex}.`,
        );
      }

      const descriptionRow: HTMLTableRowElement = document.createElement('tr');
      const item: Item | undefined = items[itemIndex];

      // We ignore this line, because it should never happen, and it's
      //   impossible to reproduce with Jest. This is a fail safe in case AWS UI
      //   ever changes their implementation details.
      // istanbul ignore next
      if (typeof item === 'undefined') {
        throw new Error(`Expected to find an item for index ${itemIndex}.`);
      }

      const itemRowClassName: string = itemRow.className;
      const itemRowNextSibling: ChildNode | null = itemRow.nextSibling;
      const itemRowCells: HTMLTableCellElement[] = Array.from(
        itemRow.getElementsByTagName('td'),
      );

      descriptionCell.className = cellClassName;
      descriptionCell.setAttribute('colspan', colSpan.toString());
      descriptionCell.style.setProperty('border-top-width', '0');
      descriptionCell.style.setProperty('padding-top', '0');
      descriptionRow.appendChild(descriptionCell);
      descriptionRow.className = itemRowClassName;
      if (typeof onRowClick === 'function') {
        descriptionRow.addEventListener('click', (): void => {
          onRowClick(
            new CustomEvent('', {
              detail: {
                item,
                rowIndex,
              },
            }),
          );
        });
      }

      // +1 for the row that we're about to append.
      rowIndexOffset++;
      if (itemRowNextSibling === null) {
        tbody.appendChild(descriptionRow);
      } else {
        tbody.insertBefore(descriptionRow, itemRowNextSibling);
      }
      descriptionRows.push(descriptionRow);

      for (const itemCell of itemRowCells) {
        itemCells.push(itemCell);
        itemCell.style.setProperty('border-bottom-width', '0');
      }
    }

    return (): void => {
      for (const descriptionRow of descriptionRows) {
        tbody.removeChild(descriptionRow);
      }
      for (const itemCell of itemCells) {
        itemCell.style.setProperty(
          'border-bottom-width',
          cellBorderBottomWidth,
        );
      }
    };
  }, [Component, colSpan, descriptionCells, items, onRowClick, ref]);

  return useCallback(
    function AwsuiTableItemDescriptionPortal(): ReactElement | null {
      if (typeof Component === 'undefined') {
        return null;
      }
      return (
        <>
          {items.map((item: Item, index: number): ReactElement => {
            const descriptionCell: HTMLTableCellElement | undefined =
              descriptionCells[index];

            // We ignore this line, because it should never happen, and it's
            //   impossible to reproduce with Jest. This is a fail safe in case
            //   AWS UI ever changes their implementation details.
            // istanbul ignore next
            if (typeof descriptionCell === 'undefined') {
              throw new Error(
                `Expected to find a description cell for item index ${index}.`,
              );
            }
            return createPortal(<Component {...item} />, descriptionCell);
          })}
        </>
      );
    },
    [Component, descriptionCells, items],
  );
}
