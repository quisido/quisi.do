import type TableColumn from '../../../types/table-column';
import TotalDownloads from '../components/total-downloads-cell';
import type Item from '../types/packages-item';
import sortByTotalDownloads from '../utils/sort-by-total-downloads';

const TOTAL_DOWNLOADS_COLUMN: Omit<TableColumn<Item>, 'header'> = {
  CellContent: TotalDownloads,
  maxWidth: 240,
  minWidth: 180,
  sort: sortByTotalDownloads,
  width: 240,
};

export default TOTAL_DOWNLOADS_COLUMN;
