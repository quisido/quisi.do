import type { TableProps } from '@cloudscape-design/components/table';
import type { ReactElement } from 'react';
import type TableColumn from '../../../../../types/table-column';
import mapIndexToColumnDefinitionId from './map-index-to-column-definition-id';

export default function mapColumnToCloudscapeDefinition<Item extends object>(
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
