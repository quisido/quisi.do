import { FetchHandler, type MetricDimensions } from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';
import type { MetricName } from './constants/metric-name.js';
import handleFetchRequest from './features/handle-fetch-request.js';
import type { Tuple } from './types/type.js';
import queriesFn from './utils/queries.js';

export default class CspFetchHandler extends FetchHandler {
  public constructor() {
    super(handleFetchRequest);
  }

  public emitPrivateMetric(
    name: MetricName,
    dimensions?: MetricDimensions,
  ): void {
    this.emitMetric(name, {
      ...dimensions,
      [PUBLIC]: false,
    });
  }

  public emitPublicMetric(
    name: MetricName,
    dimensions?: MetricDimensions,
  ): void {
    this.emitMetric(name, {
      ...dimensions,
      [PUBLIC]: true,
    });
  }

  public async queries<N extends number>(
    name: string,
    queries: Tuple<readonly [string, ...(readonly unknown[])], N>,
  ): Promise<Tuple<Record<string, unknown>[], N>> {
    const db: D1Database = this.getD1Database(name);
    return await queriesFn<N>(db, queries);
  }
}
