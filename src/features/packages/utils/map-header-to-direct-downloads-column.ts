import type TableColumn from '../../../types/table-column';
import DIRECT_DOWNLOADS_COLUMN from '../constants/direct-downloads-column';
import type Item from '../types/packages-item';

export default function mapHeaderToDirectDownloadsColumn(
  header: string,
): TableColumn<Item> {
  return {
    ...DIRECT_DOWNLOADS_COLUMN,
    header,
  };
}