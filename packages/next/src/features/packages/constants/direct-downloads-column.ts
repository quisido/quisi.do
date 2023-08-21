import type TableColumn from '../../../types/table-column';
import DirectDownloads from '../components/direct-downloads-cell';
import type Item from '../types/packages-item';
import sortByDirectDownloads from '../utils/sort-by-direct-downloads';

const DIRECT_DOWNLOADS_COLUMN: Omit<TableColumn<Item>, 'header'> = {
  CellContent: DirectDownloads,
  maxWidth: 240,
  minWidth: 180,
  sort: sortByDirectDownloads,
  width: 240,
};

export default DIRECT_DOWNLOADS_COLUMN;
