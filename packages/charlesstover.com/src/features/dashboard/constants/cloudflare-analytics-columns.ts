import type TableColumn from '../../../types/table-column';
import mapKeyToColumnCell from '../../../utils/map-key-to-column-cell';
import mapKeyToNumberSort from '../../../utils/map-key-to-number-sort';
import mapKeyToStringSort from '../../../utils/map-key-to-string-sort';
import type CloudflareAnalytic from '../types/cloudflare-analytic';

export default [
  {
    CellContent: mapKeyToColumnCell('name'),
    header: 'Analytic',
    sort: mapKeyToStringSort('name'),
  },
  {
    CellContent: mapKeyToColumnCell('min'),
    header: 'Minimum',
    sort: mapKeyToNumberSort('min'),
  },
  {
    CellContent: mapKeyToColumnCell('p25'),
    header: 'P25',
    sort: mapKeyToNumberSort('p25'),
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
  {
    CellContent: mapKeyToColumnCell('p999'),
    header: 'P99.9',
    sort: mapKeyToNumberSort('p999'),
  },
  {
    CellContent: mapKeyToColumnCell('max'),
    header: 'Maximum',
    sort: mapKeyToNumberSort('max'),
  },
  {
    CellContent: mapKeyToColumnCell('sum'),
    header: 'Sum',
    sort: mapKeyToNumberSort('sum'),
  },
] satisfies readonly TableColumn<CloudflareAnalytic>[];
