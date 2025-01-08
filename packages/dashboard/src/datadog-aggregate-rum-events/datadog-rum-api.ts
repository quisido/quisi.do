import { client, v2 } from '@datadog/datadog-api-client';
import type { RUMWarning } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import { AGGREGATE_RUM_EVENTS_REQUEST } from './aggregate-rum-events-request.js';
import sanitizeStatus from './sanitize-status.js';
import type { Status } from './status.js';

interface AggregateRumEvents {
  readonly elapsed: number;
  readonly requestId: string;
  readonly status: Status;
  readonly warnings: readonly RUMWarning[];
}

interface Options {
  readonly apiKey: string;
  readonly fetch: Fetcher['fetch'];
  readonly rumReadApplicationKey: string;
}

const DEFAULT_ELAPSED = 0;

export default class DatadogRumApi extends v2.RUMApi {
  public constructor({ apiKey, fetch, rumReadApplicationKey }: Options) {
    super(
      client.createConfiguration({
        debug: true,
        enableRetry: true,
        fetch,

        authMethods: {
          apiKeyAuth: apiKey,
          appKeyAuth: rumReadApplicationKey,
        },

        httpConfig: {
          compress: true,
        },
      }),
    );
  }

  public async getAggregateRumEvents(): Promise<AggregateRumEvents> {
    const { data = {}, meta = {} } = await this.aggregateRUMEvents(
      AGGREGATE_RUM_EVENTS_REQUEST,
    );

    const {
      buckets: [
        { computes: { c0: cls, c1: fcp, c2: inp, c3: lcp, c4: lt } = {} } = {},
      ] = [],
    } = data;

    return {
      elapsed: meta.elapsed ?? DEFAULT_ELAPSED,
      requestId: meta.requestId ?? '',
      status: sanitizeStatus(meta.status),
      warnings: meta.warnings ?? [],
    };
  }
}
