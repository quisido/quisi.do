import { TableProps } from '@awsui/components-react/table';
import {
  colorBackgroundItemSelected,
  colorBorderItemSelected,
} from '@awsui/design-tokens';
import { MutableRefObject, useLayoutEffect } from 'react';
import CellColors from '../types/cell-colors';
import getHighlightedDescriptionCells from '../utils/get-highlighted-description-cells';
import mapRefToRows from '../utils/map-ref-to-rows';
import mapRowsToCellColors from '../utils/map-rows-to-cell-colors';

interface Props<Item> {
  enabled: boolean;
  ref: MutableRefObject<HTMLDivElement | null>;
  rowClickDetails: TableProps.OnRowClickDetail<Item>[];
}

export default function useTableItemDescriptionHighlight<Item>({
  enabled,
  ref,
  rowClickDetails,
}: Props<Item>): void {
  useLayoutEffect((): void | VoidFunction => {
    if (!enabled) {
      return;
    }

    const rows: HTMLCollectionOf<HTMLTableRowElement> | null = mapRefToRows(
      ref,
    );
    if (rows === null) {
      return;
    }

    const cellColors: CellColors | null = mapRowsToCellColors(rows);
    if (cellColors === null) {
      return;
    }

    const highlightedDescriptionCells: HTMLTableCellElement[] = getHighlightedDescriptionCells(
      rows,
      rowClickDetails,
    );

    for (const cell of highlightedDescriptionCells) {
      cell.style.setProperty('background-color', colorBackgroundItemSelected);
      cell.style.setProperty('border-color', colorBorderItemSelected);
    }

    return (): void => {
      for (const cell of highlightedDescriptionCells) {
        cell.style.setProperty('background-color', cellColors.background);
        cell.style.setProperty('border-color', cellColors.border);
      }
    };
  }, [enabled, ref, rowClickDetails]);
}
