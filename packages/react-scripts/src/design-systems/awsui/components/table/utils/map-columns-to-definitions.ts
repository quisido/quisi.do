import type { TableProps } from '@awsui/components-react/table';
import type TableColumn from '../../../../../types/table-column';
import mapColumnToDefinition from './map-column-to-definition';

export default function mapColumnsToAwsuiDefinitions<Item extends object>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return columns.map(mapColumnToDefinition);
}
