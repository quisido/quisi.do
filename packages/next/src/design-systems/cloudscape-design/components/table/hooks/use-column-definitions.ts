import { type TableProps } from '@cloudscape-design/components/table';
import type TableColumn from '../../../../../types/table-column';
import mapColumnsToDefinitions from '../utils/map-columns-to-definitions';

export default function useCloudscapeDesignColumnDefinitions<
  Item extends object,
>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return mapColumnsToDefinitions(columns);
}
