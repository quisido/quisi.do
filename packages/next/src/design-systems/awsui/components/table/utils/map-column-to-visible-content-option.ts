import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type TableColumn from '../../../../../types/table-column';
import mapIndexToColumnDefinitionId from './map-index-to-column-definition-id';

export default function mapColumnToAwsuiVisibleContentOption<Item>(
  { header }: TableColumn<Item>,
  index: number,
): CollectionPreferencesProps.VisibleContentOption {
  return {
    id: mapIndexToColumnDefinitionId(index),
    label: header,
  };
}
