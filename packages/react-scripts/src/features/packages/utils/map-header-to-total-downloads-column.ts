import type TableColumn from '../../../types/table-column';
import TOTAL_DOWNLOADS_COLUMN from '../constants/total-downloads-column';
import type Item from '../types/packages-item';

export default function mapHeaderToTotalDownloadsColumn(
  header: string,
): TableColumn<Item> {
  return {
    ...TOTAL_DOWNLOADS_COLUMN,
    header,
  };
}
