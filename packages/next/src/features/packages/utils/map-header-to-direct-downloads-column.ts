import type TableColumn from '../../../types/table-column.js';
import DIRECT_DOWNLOADS_COLUMN from '../constants/direct-downloads-column.js';
import type Item from '../types/packages-item.js';

export default function mapHeaderToDirectDownloadsColumn(
  header: string,
): TableColumn<Item> {
  return {
    ...DIRECT_DOWNLOADS_COLUMN,
    header,
  };
}
