import { type ReactElement } from 'react';
import Table from '../../../../../../components/table/index.js';
import type WorkersInvocations from '../../../../../../types/cloudflare-workers-invocations.js';
import createIndexArray from '../../../../../../utils/create-index-array.js';
import COLUMNS from '../../constants/workers-invocations-columns.js';
import type Analytic from '../../types/workers-invocations-analytic.js';
import Header from '../workers-invocations-header/index.js';
import useWorkersInvocations from './workers-invocations.hook.js';

interface Props {
  readonly children: WorkersInvocations;
}

const COLUMNS_LENGTH: number = COLUMNS.length;
const VISIBLE_COLUMN_INDICES: readonly number[] =
  createIndexArray(COLUMNS_LENGTH);

export default function CloudflareWorkersInvocations({
  children,
}: Props): ReactElement {
  const { handleSort, rows, sortAscending, sortColumnIndex, subheader } =
    useWorkersInvocations(children);

  return (
    <Table<Analytic>
      columns={COLUMNS}
      header={<Header />}
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
