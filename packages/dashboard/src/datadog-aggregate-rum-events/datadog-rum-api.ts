import { v2 } from '@datadog/datadog-api-client';
import type { RUMWarning } from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/index.js';
import createConfiguration from './create-configuration.js';
import createRumAggregateRequest from './create-rum-aggregate-request.js';
import mapAggregateRumResponse from './map-aggregate-rum-response.js';
import {
  ERROR_COUNT_COMPUTES,
  LOAD_TIMING_COMPUTES,
  PERFORMANCE_TIMING_COMPUTES,
  SESSION_AND_LAYOUT_COMPUTES,
  THREE_WEEK_FILTER,
  TWO_WEEK_FILTER,
} from './rum-compute-definitions.js';
import type { Status } from './status.js';

interface AggregateRumEvents {
  readonly cumulativeLayoutShiftP50?: number | undefined;
  readonly cumulativeLayoutShiftP75?: number | undefined;
  readonly domCompleteP50?: number | undefined;
  readonly domCompleteP75?: number | undefined;
  readonly domContentLoadedP50?: number | undefined;
  readonly domContentLoadedP75?: number | undefined;
  readonly elapsed: number;
  readonly errorCountP50?: readonly number[] | undefined;
  readonly errorCountP75?: readonly number[] | undefined;
  readonly errorCountP90?: readonly number[] | undefined;
  readonly firstByteP50?: number | undefined;
  readonly firstByteP75?: number | undefined;
  readonly firstContentfulPaintP50?: number | undefined;
  readonly firstContentfulPaintP75?: number | undefined;
  readonly firstInputDelayP50?: number | undefined;
  readonly firstInputDelayP75?: number | undefined;
  readonly interactionToNextPaintP50?: number | undefined;
  readonly interactionToNextPaintP75?: number | undefined;
  readonly largestContentfulPaintP50?: number | undefined;
  readonly largestContentfulPaintP75?: number | undefined;
  readonly loadEventP50?: number | undefined;
  readonly loadEventP75?: number | undefined;
  readonly loadingTimeP50?: number | undefined;
  readonly loadingTimeP75?: number | undefined;
  readonly requestId: string;
  readonly sessionTimeSpent?: number | undefined;
  readonly status: Status;
  readonly viewTimeSpent?: number | undefined;
  readonly warnings: readonly RUMWarning[];
}

interface Options {
  readonly apiKey: string;
  readonly fetch: Fetcher['fetch'];
  readonly rumReadApplicationKey: string;
}

export default class DatadogRumApi extends v2.RUMApi {
  public constructor({ apiKey, fetch, rumReadApplicationKey }: Options) {
    super(
      createConfiguration({
        apiKey,
        fetch,
        rumReadApplicationKey,
      }),
    );
  }

  public async getAggregateRumEvents(
    applicationId: string,
  ): Promise<AggregateRumEvents> {
    const [
      sessionAndLayoutResponse,
      performanceTimingResponse,
      loadTimingResponse,
      errorCountResponse,
    ] = await Promise.all([
      this.aggregateRUMEvents(
        createRumAggregateRequest(
          applicationId,
          SESSION_AND_LAYOUT_COMPUTES,
          TWO_WEEK_FILTER,
        ),
      ),
      this.aggregateRUMEvents(
        createRumAggregateRequest(
          applicationId,
          PERFORMANCE_TIMING_COMPUTES,
          TWO_WEEK_FILTER,
        ),
      ),
      this.aggregateRUMEvents(
        createRumAggregateRequest(
          applicationId,
          LOAD_TIMING_COMPUTES,
          TWO_WEEK_FILTER,
        ),
      ),
      this.aggregateRUMEvents(
        createRumAggregateRequest(
          applicationId,
          ERROR_COUNT_COMPUTES,
          THREE_WEEK_FILTER,
        ),
      ),
    ]);

    return mapAggregateRumResponse({
      errorCountResponse,
      loadTimingResponse,
      performanceTimingResponse,
      sessionAndLayoutResponse,
    });
  }
}
