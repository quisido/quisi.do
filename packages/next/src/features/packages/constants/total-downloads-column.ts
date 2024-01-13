import type TableColumn from '../../../types/table-column.js';
import TotalDownloads from '../components/total-downloads-cell.js';
import type Item from '../types/packages-item.js';
import sortByTotalDownloads from '../utils/sort-by-total-downloads.js';

const TOTAL_DOWNLOADS_COLUMN: Omit<TableColumn<Item>, 'header'> = {
  CellContent: TotalDownloads,
  maxWidth: 240,
  minWidth: 180,
  sort: sortByTotalDownloads,
  width: 240,
};

export default TOTAL_DOWNLOADS_COLUMN;
