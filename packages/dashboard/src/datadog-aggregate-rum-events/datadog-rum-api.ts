import { client, v2 } from '@datadog/datadog-api-client';
import type { RUMWarning } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import mapToOptionalNumber from '../utils/map-to-optional-number.js';
import { AGGREGATE_RUM_EVENTS_REQUEST } from './aggregate-rum-events-request.js';
import sanitizeStatus from './sanitize-status.js';
import type { Status } from './status.js';

interface AggregateRumEvents {
  readonly cumulativeLayoutShiftP50?: number | undefined;
  readonly cumulativeLayoutShiftP75?: number | undefined;
  readonly elapsed: number;
  readonly firstContentfulPaintP50?: number | undefined;
  readonly firstContentfulPaintP75?: number | undefined;
  readonly interactionToNextPaintP50?: number | undefined;
  readonly interactionToNextPaintP75?: number | undefined;
  readonly largestContentfulPaintP50?: number | undefined;
  readonly largestContentfulPaintP75?: number | undefined;
  readonly loadingTimeP50?: number | undefined;
  readonly loadingTimeP75?: number | undefined;
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
        {
          computes: {
            c0: cumulativeLayoutShiftP50,
            c1: cumulativeLayoutShiftP75,
            c2: firstContentfulPaintP50,
            c3: firstContentfulPaintP75,
            c4: interactionToNextPaintP50,
            c5: interactionToNextPaintP75,
            c6: largestContentfulPaintP50,
            c7: largestContentfulPaintP75,
            c8: loadingTimeP50,
            c9: loadingTimeP75,
          } = {},
        } = {},
      ] = [],
    } = data;

    return {
      cumulativeLayoutShiftP50: mapToOptionalNumber(cumulativeLayoutShiftP50),
      cumulativeLayoutShiftP75: mapToOptionalNumber(cumulativeLayoutShiftP75),
      elapsed: meta.elapsed ?? DEFAULT_ELAPSED,
      firstContentfulPaintP50: mapToOptionalNumber(firstContentfulPaintP50),
      firstContentfulPaintP75: mapToOptionalNumber(firstContentfulPaintP75),
      interactionToNextPaintP50: mapToOptionalNumber(interactionToNextPaintP50),
      interactionToNextPaintP75: mapToOptionalNumber(interactionToNextPaintP75),
      largestContentfulPaintP50: mapToOptionalNumber(largestContentfulPaintP50),
      largestContentfulPaintP75: mapToOptionalNumber(largestContentfulPaintP75),
      loadingTimeP50: mapToOptionalNumber(loadingTimeP50),
      loadingTimeP75: mapToOptionalNumber(loadingTimeP75),
      requestId: meta.requestId ?? '',
      status: sanitizeStatus(meta.status),
      warnings: meta.warnings ?? [],
    };
  }
}
