import type TableRowsPerPageOption from '../../../../../types/table-rows-per-page-option.js';
import type RowsPerPageOption from '../types/rows-per-page-option.js';
import mapRowsPerPageOptionToMuiRowsPerPageOption from './map-rows-per-page-option-to-mui-rows-per-page-option.js';

export default function mapRowsPerPageOptionsToMuiRowsPerPageOptions(
  rowsPerPageOptions: readonly TableRowsPerPageOption[],
): RowsPerPageOption[] {
  return rowsPerPageOptions.map(mapRowsPerPageOptionToMuiRowsPerPageOption);
}
