import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type TableRowsPerPageOption from '../../../types/table-rows-per-page-option';

export default function mapRowsPerPageOptionToPageSizeOption({
  label,
  value,
}: TableRowsPerPageOption): CollectionPreferencesProps.PageSizeOption {
  return {
    label: label ?? value.toString(),
    value: value,
  };
}
