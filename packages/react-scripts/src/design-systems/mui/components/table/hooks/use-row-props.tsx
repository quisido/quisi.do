/* eslint-disable react/no-multi-comp */
import type { Attributes, ComponentType, ReactElement } from 'react';
import { useCallback, useMemo } from 'react';
import type Column from '../../../../../types/table-column';
import type CellProps from '../types/cell-props';
import type RowProps from '../types/row-props';

interface Props<Item extends object> {
  readonly Description?: ComponentType<Item> | undefined;
  readonly columns: readonly Column<Item>[];
  readonly items: readonly Item[];
}

const FIRST_INDEX = 0;

export default function useMuiTableRowProps<Item extends object>({
  Description,
  columns,
  items,
}: Readonly<Props<Item>>): readonly (Required<Attributes> & RowProps)[] {
  const mapItemToProps = useCallback(
    (item: Item, itemIndex: number): Required<Attributes> & RowProps => {
      const mapColumnToCellProps = (
        { CellContent }: Column<Item>,
        columnIndex: number,
      ): CellProps & Required<Attributes> => {
        return {
          align: columnIndex === FIRST_INDEX ? 'left' : 'right',
          key: columnIndex,
          Content(): ReactElement {
            return <CellContent {...item} />;
          },
        };
      };

      const props: Required<Attributes> & RowProps = {
        cellProps: columns.map(mapColumnToCellProps),
        key: itemIndex,
      };

      if (typeof Description === 'undefined') {
        return props;
      }

      return {
        ...props,
        Description(): ReactElement {
          return <Description {...item} />;
        },
      };
    },
    [Description, columns],
  );

  return useMemo((): readonly (Required<Attributes> & RowProps)[] => {
    return items.map(mapItemToProps);
  }, [items, mapItemToProps]);
}
