import type Worker from '@quisido/worker';
import type { AnalyticsEngineRow } from 'cloudflare-utils';
import datumFactoryFactory from './datum-factory-factory.js';
import { type Datum } from './datum.js';

export default function reduceAnalyticsEngineRowsToResponse(
  this: Worker,
  response: Record<string, readonly Datum[]>,
  row: AnalyticsEngineRow,
): Record<string, readonly Datum[]> {
  const previousData: readonly Datum[] = response[row.index1] ?? [];
  const mapRowToDatum = datumFactoryFactory.call(this, row.index1);
  return {
    ...response,
    [row.index1]: [...previousData, mapRowToDatum(row)],
  };
}
