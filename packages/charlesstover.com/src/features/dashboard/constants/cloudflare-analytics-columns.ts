import type TableColumn from '../../../types/table-column';
import mapKeyToColumnCell from '../../../utils/map-key-to-column-cell';
import CloudflareAnalytic from '../types/cloudflare-analytic';

export default [
  {
    CellContent: mapKeyToColumnCell('name'),
    header: 'Analytic',
  },
  {
    CellContent: mapKeyToColumnCell('min'),
    header: 'Minimum',
  },
  {
    CellContent: mapKeyToColumnCell('p25'),
    header: 'P25',
  },
  {
    CellContent: mapKeyToColumnCell('p50'),
    header: 'P50',
  },
  {
    CellContent: mapKeyToColumnCell('p75'),
    header: 'P75',
  },
  {
    CellContent: mapKeyToColumnCell('p90'),
    header: 'P90',
  },
  {
    CellContent: mapKeyToColumnCell('p99'),
    header: 'P99',
  },
  {
    CellContent: mapKeyToColumnCell('p999'),
    header: 'P99.9',
  },
  {
    CellContent: mapKeyToColumnCell('max'),
    header: 'Maximum',
  },
  {
    CellContent: mapKeyToColumnCell('sum'),
    header: 'Sum',
  },
] satisfies readonly TableColumn<CloudflareAnalytic>[];
