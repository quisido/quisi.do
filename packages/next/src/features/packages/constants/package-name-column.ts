import type TableColumn from '../../../types/table-column.js';
import type Item from '../types/packages-item.js';
import sortByPackageName from '../utils/sort-by-package-name.js';

const PACKAGE_NAME_COLUMN: Omit<TableColumn<Item>, 'CellContent' | 'header'> = {
  minWidth: 240,
  sort: sortByPackageName,
  width: 320,
};

export default PACKAGE_NAME_COLUMN;
