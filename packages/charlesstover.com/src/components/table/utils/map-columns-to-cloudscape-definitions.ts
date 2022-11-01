import type { TableProps } from '@cloudscape-design/components/table';
import type TableColumn from '../../../types/table-column';
import mapColumnToCloudscapeDefinition from '../utils/map-column-to-cloudscape-definition';

export default function mapColumnsToCloudscapeDefinitions<
  Item extends Record<string, unknown>,
>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return columns.map(mapColumnToCloudscapeDefinition);
}
