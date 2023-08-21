import type { TableProps } from '@cloudscape-design/components/table';
import type TableColumn from '../../../../../types/table-column';
import mapColumnToDefinition from '../utils/map-column-to-definition';

export default function mapColumnsToCloudscapeDefinitions<Item extends object>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return columns.map(mapColumnToDefinition);
}
