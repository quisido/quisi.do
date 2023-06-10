import { ReactElement } from 'react';
import Table from '../../../../../../components/table';
import type WorkersInvocations from '../../../../../../types/cloudflare-workers-invocations';
import createIndexArray from '../../../../../../utils/create-index-array';
import type Analytic from '../../../../types/cloudflare-analytic';
import ANALYTICS_COLUMNS from '../../constants/analytics-columns';
import useWorkersInvocations from './workers-invocations.hook';
import I18n from 'lazy-i18n';

interface Props {
  readonly children: WorkersInvocations;
}

const COLUMNS_LENGTH: number = ANALYTICS_COLUMNS.length;
const VISIBLE_COLUMN_INDICES: readonly number[] =
  createIndexArray(COLUMNS_LENGTH);

export default function CloudflareWorkersInvocations({
  children,
}: Readonly<Props>): ReactElement {
  const { handleSort, rows, sortAscending, sortColumnIndex } =
    useWorkersInvocations(children);

  return (
    <Table<Analytic>
      columns={ANALYTICS_COLUMNS}
      header={<I18n>Cloudflare Workers invocations</I18n>}
      onSort={handleSort}
      rows={rows}
      rowsCount={1}
      rowsPerPage={1}
      sortAscending={sortAscending}
      sortColumnIndex={sortColumnIndex}
      visibleColumnIndices={VISIBLE_COLUMN_INDICES}
    />
  );
}
