import type TableColumn from '../../../types/table-column.js';
import TOTAL_DOWNLOADS_COLUMN from '../constants/total-downloads-column.js';
import type Item from '../types/packages-item.js';

export default function mapHeaderToTotalDownloadsColumn(
  header: string,
): TableColumn<Item> {
  return {
    ...TOTAL_DOWNLOADS_COLUMN,
    header,
  };
}
