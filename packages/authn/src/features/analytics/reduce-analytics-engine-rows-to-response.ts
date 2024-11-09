import type { AnalyticsEngineRow } from 'cloudflare-utils';
import type AuthnFetchHandler from '../authn-fetch-handler.js';
import datumFactoryFactory from './datum-factory-factory.js';
import { type Datum } from './datum.js';

export default function reduceAnalyticsEngineRowsToResponse(
  this: AuthnFetchHandler,
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
