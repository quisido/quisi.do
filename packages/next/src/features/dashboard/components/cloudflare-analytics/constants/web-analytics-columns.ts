import type TableColumn from '../../../../../types/table-column.js';
import mapKeyToNumberSort from '../../../../../utils/map-key-to-number-sort.js';
import mapKeyToStringSort from '../../../../../utils/map-key-to-string-sort.js';
import type Analytic from '../types/web-analytic.js';
import mapKeyToColumnCell from '../utils/map-key-to-column-cell.js';

export default [
  {
    CellContent: mapKeyToColumnCell('name'),
    header: 'Analytic',
    sort: mapKeyToStringSort('name'),
  },
  {
    CellContent: mapKeyToColumnCell('avg'),
    header: 'Average',
    sort: mapKeyToNumberSort('avg'),
  },
  {
    CellContent: mapKeyToColumnCell('p50'),
    header: 'P50',
    sort: mapKeyToNumberSort('p50'),
  },
  {
    CellContent: mapKeyToColumnCell('p75'),
    header: 'P75',
    sort: mapKeyToNumberSort('p75'),
  },
  {
    CellContent: mapKeyToColumnCell('p90'),
    header: 'P90',
    sort: mapKeyToNumberSort('p90'),
  },
  {
    CellContent: mapKeyToColumnCell('p99'),
    header: 'P99',
    sort: mapKeyToNumberSort('p99'),
  },
] satisfies readonly TableColumn<Analytic>[];
