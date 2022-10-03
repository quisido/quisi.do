import type TableRowsPerPageOption from '../../../types/table-rows-per-page-option';
import type MuiRowsPerPageOption from '../types/mui-rows-per-page-option';

export default function mapRowsPerPageOptionToMuiRowsPerPageOption({
  label,
  value,
}: TableRowsPerPageOption): MuiRowsPerPageOption {
  return {
    label: label ?? value.toString(),
    value,
  };
}
