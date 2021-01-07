import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { TableProps } from '@awsui/components-react/table';
import {
  colorBackgroundItemSelected,
  colorBorderItemSelected,
} from '@awsui/design-tokens';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import CellColors from '../types/cell-colors';
import getHighlightedCells from '../utils/get-highlighted-cells';
import mapRefToRows from '../utils/map-ref-to-rows';
import mapRowsToCellColors from '../utils/map-rows-to-cell-colors';

interface Props<Item> {
  defaultRowClickDetails?: TableProps.OnRowClickDetail<Item>[];
  ref: MutableRefObject<HTMLDivElement | null>;
}

interface State<Item> {
  handleRowClick: Required<TableProps>['onRowClick'];
  rowClickDetails: TableProps.OnRowClickDetail<Item>[];
  setRowClickDetails: Dispatch<
    SetStateAction<TableProps.OnRowClickDetail<Item>[]>
  >;
}

const DEFAULT_DEFAULT_ROW_CLICK_DETAILS: readonly unknown[] = Object.freeze([]);

export default function useTableHighlight<Item>({
  defaultRowClickDetails = DEFAULT_DEFAULT_ROW_CLICK_DETAILS as TableProps.OnRowClickDetail<Item>[],
  ref,
}: Props<Item>): State<Item> {
  const [rowClickDetails, setRowClickDetails] = useState<
    TableProps.OnRowClickDetail<Item>[]
  >(defaultRowClickDetails);

  const handleRowClick = useCallback(
    (e: NonCancelableCustomEvent<TableProps.OnRowClickDetail<Item>>): void => {
      setRowClickDetails(
        (
          oldRowClickDetails: TableProps.OnRowClickDetail<Item>[],
        ): TableProps.OnRowClickDetail<Item>[] => {
          const findRowClickDetailByItem = ({
            item,
          }: TableProps.OnRowClickDetail<Item>) => item === e.detail.item;
          const index: number = oldRowClickDetails.findIndex(
            findRowClickDetailByItem,
          );
          if (index === -1) {
            return [...oldRowClickDetails, e.detail];
          }
          const newRowClickDetails: TableProps.OnRowClickDetail<Item>[] = [
            ...oldRowClickDetails,
          ];
          newRowClickDetails.splice(index, 1);
          return newRowClickDetails;
        },
      );
    },
    [],
  );

  useLayoutEffect((): void | VoidFunction => {
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

    const highlightedCells: HTMLTableCellElement[] = getHighlightedCells(
      rows,
      rowClickDetails,
    );

    for (const cell of highlightedCells) {
      cell.style.setProperty('background-color', colorBackgroundItemSelected);
      cell.style.setProperty('border-color', colorBorderItemSelected);
    }

    return (): void => {
      for (const cell of highlightedCells) {
        cell.style.setProperty('background-color', cellColors.background);
        cell.style.setProperty('border-color', cellColors.border);
      }
    };
  }, [ref, rowClickDetails]);

  return {
    handleRowClick,
    rowClickDetails,
    setRowClickDetails,
  };
}
