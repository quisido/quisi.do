import type { TableProps } from '@awsui/components-react/table';
import type { ReactElement } from 'react';
import type TableColumn from '../../../types/table-column';
import mapIndexToColumnDefinitionId from '../utils/map-index-to-column-definition-id';

export default function mapColumnToDefinition<
  Item extends Record<string, unknown>,
>(
  { CellContent, header, maxWidth, minWidth, width }: TableColumn<Item>,
  index: number,
): TableProps.ColumnDefinition<Item> {
  const optionalProperties: Pick<
    TableProps.ColumnDefinition<Item>,
    'maxWidth' | 'minWidth' | 'width'
  > = {};
  if (typeof maxWidth === 'number') {
    optionalProperties.maxWidth = maxWidth;
  }
  if (typeof minWidth === 'number') {
    optionalProperties.minWidth = minWidth;
  }
  if (typeof width === 'number') {
    optionalProperties.width = width;
  }

  return {
    ...optionalProperties,
    header,
    id: mapIndexToColumnDefinitionId(index),
    sortingField: index.toString(),
    cell(item: Item): ReactElement {
      return <CellContent {...item} />;
    },
  };
}
