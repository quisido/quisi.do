import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Table from '../../../../../../components/table';
import type RumPerformanceEvents from '../../../../../../types/cloudflare-rum-performance-events';
import createIndexArray from '../../../../../../utils/create-index-array';
import type Analytic from '../../types/web-analytic';
import COLUMNS from '../../constants/web-analytics-columns';
import useWebAnalytics from './web-analytics.hook';

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
      header={<I18n>Cloudflare Web Analytics</I18n>}
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
