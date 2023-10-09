import { type CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import type TableColumn from '../../../../../types/table-column';
import mapIndexToColumnDefinitionId from '../utils/map-index-to-column-definition-id';

export default function mapColumnToCloudscapeVisibleContentOption<Item>(
  { header }: TableColumn<Item>,
  index: number,
): CollectionPreferencesProps.VisibleContentOption {
  return {
    id: mapIndexToColumnDefinitionId(index),
    label: header,
  };
}
