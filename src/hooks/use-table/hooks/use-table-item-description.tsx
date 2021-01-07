import { TableProps } from '@awsui/components-react/table';
import { ComponentType, MutableRefObject, useLayoutEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import mapRefToTbody from '../utils/map-ref-to-tbody';
import mapRowToCellClassName from '../utils/map-row-to-cell-class-name';
import mapRowsToCellBorderBottomWidth from '../utils/map-rows-to-cell-border-bottom-width';

interface Props<Item> {
  Component?: ComponentType<Item>;
  items: Item[];
  onRowClick: Required<TableProps>['onRowClick'];
  ref: MutableRefObject<HTMLDivElement | null>;
  rowClickDetails: TableProps.OnRowClickDetail<Item>[];
}

export default function useTableItemDescription<Item>({
  Component,
  onRowClick,
  items,
  ref,
  rowClickDetails,
}: Props<Item>): void {
  useLayoutEffect((): void | VoidFunction => {
    if (typeof Component === 'undefined') {
      return;
    }

    const tbody: HTMLTableSectionElement | null = mapRefToTbody(ref);
    if (tbody === null) {
      return;
    }

    const rows: HTMLCollectionOf<HTMLTableRowElement> = tbody.getElementsByTagName(
      'tr',
    );

    const cellBorderBottomWidth: null | string = mapRowsToCellBorderBottomWidth(
      rows,
    );
    if (cellBorderBottomWidth === null) {
      return;
    }

    const descriptionCells: HTMLTableCellElement[] = [];
    const descriptionRows: HTMLTableRowElement[] = [];
    const itemCells: HTMLTableCellElement[] = [];
    for (let i = 0; i < rows.length; i += 2) {
      const itemRow: HTMLTableRowElement | null = rows.item(i);
      if (itemRow === null) {
        continue;
      }

      const cellClassName: null | string = mapRowToCellClassName(itemRow);
      if (cellClassName === null) {
        continue;
      }

      for (const itemCell of Array.from(itemRow.getElementsByTagName('td'))) {
        itemCells.push(itemCell);
        itemCell.style.setProperty('border-bottom-width', '0');
      }

      const rowIndex: number = i / 2;
      const item: Item = items[rowIndex];

      const descriptionRow: HTMLTableRowElement = document.createElement('tr');
      descriptionRows.push(descriptionRow);
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
      descriptionRow.className = itemRow.className;

      const descriptionCell: HTMLTableCellElement = document.createElement(
        'td',
      );
      descriptionCells.push(descriptionCell);
      descriptionCell.className = cellClassName;
      descriptionCell.setAttribute(
        'colspan',
        itemRow.childNodes.length.toString(),
      );
      descriptionCell.style.setProperty('border-top-width', '0');
      descriptionCell.style.setProperty('padding-top', '0');
      render(<Component {...item} />, descriptionCell);

      descriptionRow.appendChild(descriptionCell);
      tbody.insertBefore(descriptionRow, itemRow.nextSibling);
    }

    return (): void => {
      for (const descriptionCell of descriptionCells) {
        unmountComponentAtNode(descriptionCell);
      }
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
  }, [Component, items, onRowClick, ref, rowClickDetails]);
}
