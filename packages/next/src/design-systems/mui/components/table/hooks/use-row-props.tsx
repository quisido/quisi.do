/* eslint-disable react/no-multi-comp */
import {
  type ComponentType,
  type ReactElement,
  useCallback,
  useMemo,
} from 'react';
import type Column from '../../../../../types/table-column.js';
import type { WithKey } from '../../../../../types/with-key.js';
import type CellProps from '../types/cell-props.js';
import type RowProps from '../types/row-props.js';

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
}: Readonly<Props<Item>>): readonly WithKey<RowProps>[] {
  const mapItemToProps = useCallback(
    (item: Item, itemIndex: number): WithKey<RowProps> => {
      const mapColumnToCellProps = (
        { CellContent }: Column<Item>,
        columnIndex: number,
      ): WithKey<CellProps> => {
        return {
          align: columnIndex === FIRST_INDEX ? 'left' : 'right',
          key: columnIndex,
          Content(): ReactElement {
            return <CellContent {...item} />;
          },
        };
      };

      const props: WithKey<RowProps> = {
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

  return useMemo((): readonly WithKey<RowProps>[] => {
    return items.map(mapItemToProps);
  }, [items, mapItemToProps]);
}
