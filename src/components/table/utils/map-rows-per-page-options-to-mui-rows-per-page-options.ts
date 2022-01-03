import type TableRowsPerPageOption from '../../../types/table-rows-per-page-option';
import type MuiRowsPerPageOption from '../types/mui-rows-per-page-option';
import mapRowsPerPageOptionToMuiRowsPerPageOption from './map-rows-per-page-option-to-mui-rows-per-page-option';

export default function mapRowsPerPageOptionsToMuiRowsPerPageOptions(
  rowsPerPageOptions: readonly TableRowsPerPageOption[],
): MuiRowsPerPageOption[] {
  return rowsPerPageOptions.map(mapRowsPerPageOptionToMuiRowsPerPageOption);
}
