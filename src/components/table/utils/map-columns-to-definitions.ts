import type { TableProps } from '@awsui/components-react/table';
import type TableColumn from '../../../types/table-column';
import mapColumnToDefinition from '../utils/map-column-to-definition';

export default function mapColumnsToDefinitions<Item>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return columns.map(mapColumnToDefinition);
}
