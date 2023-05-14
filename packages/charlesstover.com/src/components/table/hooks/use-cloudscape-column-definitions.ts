import type { TableProps } from '@cloudscape-design/components/table';
import type TableColumn from '../../../types/table-column';
import mapColumnsToCloudscapeDefinitions from '../utils/map-columns-to-cloudscape-definitions';

export default function useCloudscapeColumnDefinitions<
  Item extends Record<string, unknown>,
>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return mapColumnsToCloudscapeDefinitions(columns);
}
