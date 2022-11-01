import type { TableProps } from '@awsui/components-react/table';
import type TableColumn from '../../../types/table-column';
import mapColumnToAwsDefinition from '../utils/map-column-to-aws-definition';

export default function mapColumnsToAwsDefinitions<
  Item extends Record<string, unknown>,
>(
  columns: readonly TableColumn<Item>[],
): readonly TableProps.ColumnDefinition<Item>[] {
  return columns.map(mapColumnToAwsDefinition);
}
