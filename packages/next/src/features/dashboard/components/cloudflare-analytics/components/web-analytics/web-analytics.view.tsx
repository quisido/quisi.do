import { type ReactElement } from 'react';
import Table from '../../../../../../components/table.js';
import type RumPerformanceEvents from '../../../../../../types/cloudflare-rum-performance-events.js';
import createIndexArray from '../../../../../../utils/create-index-array.js';
import COLUMNS from '../../constants/web-analytics-columns.js';
import type Analytic from '../../types/web-analytic.js';
import useWebAnalytics from './web-analytics.hook.js';

interface Props {
  readonly children: RumPerformanceEvents;
}

const COLUMNS_LENGTH: number = COLUMNS.length;
const VISIBLE_COLUMN_INDICES: readonly number[] =
  createIndexArray(COLUMNS_LENGTH);

export default function CloudflareWebAnalytics({
  children,
}: Props): ReactElement {
  const { handleSort, rows, sortAscending, sortColumnIndex, subheader } =
    useWebAnalytics(children);

  return (
    <Table<Analytic>
      columns={COLUMNS}
      header="Cloudflare Web Analytics"
      onSort={handleSort}
      rows={rows}
      rowsCount={1}
      rowsPerPage={1}
      sortAscending={sortAscending}
      sortColumnIndex={sortColumnIndex}
      subheader={subheader}
      visibleColumnIndices={VISIBLE_COLUMN_INDICES}
    />
  );
}
