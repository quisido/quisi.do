import { ErrorCode } from '@quisido/authn-shared';
import { AccountNumber, UsageType } from '@quisido/workers-shared';
import { mapUnknownToError } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import type { TraceParent } from '../modules/trace-parent/index.js';
import type { Metric } from '../types/metric.js';
import isAnaylticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import mapAnalyticsEngineDatasetToEmitter from '../utils/map-analytics-dataset-engine-to-emitter.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import mapRequestToTraceParent from '../utils/map-request-to-trace-parent.js';
import TelemetryQueue from '../utils/telemetry-queue.js';

const HEXADECIMAL = 16;
const SINGLE = 1;

// Current design does not allow optional dimensions. Set defaults.
const DEFAULT_PUBLIC_METRIC_DIMENSIONS: Partial<
  Record<string, number | string>
> = {
  traceFlags: 0,
  traceId: '00000000000000000000000000000000',
  traceParentId: '0000000000000000',
  traceVersion: 0,
};

const mapNumberToHex = (num: number): string => {
  const str: string = num.toString(HEXADECIMAL);
  if (str.length === SINGLE) {
    return `0${str}`;
  }
  return str;
};

const mapTraceParentToDimensions = ({
  parentId,
  traceFlags,
  traceId,
  version,
}: TraceParent): Partial<Record<string, number | string>> => ({
  traceFlags,
  traceId: traceId.map(mapNumberToHex).join(''),
  traceParentId: parentId.map(mapNumberToHex).join(''),
  traceVersion: version,
});

export default class AuthenticationTelemetryQueue extends TelemetryQueue<Metric> {
  public constructor(
    env: Record<string, unknown>,
    ctx: ExecutionContext,
    traceId: string,
  ) {
    super();

    const { USAGE } = env;
    if (!isAnaylticsEngineDataset(USAGE)) {
      throw mapCauseToError({
        code: ErrorCode.InvalidUsageDataset,
        privateData: JSON.stringify(USAGE),
        publicData: typeof USAGE,
      });
    }

    this.onPrivateError((err: Error): void => {
      // When given an `Error`, Cloudflare does not include `cause` or `stack`.
      console.error(err.message, err.cause, err.stack);
    });

    this.onPublicError((err: Error): void => {
      // When given an `Error`, Cloudflare does not include `cause` or `stack`.
      console.error(err.message, err.cause, err.stack);
    });

    this.onSideEffect((promise: Promise<unknown>): void => {
      ctx.waitUntil(promise);
    });

    this.addPublicDimensions({
      ...DEFAULT_PUBLIC_METRIC_DIMENSIONS,
      timestamp: Date.now(),
      traceId,
    });

    const { PRIVATE_DATASET, PUBLIC_DATASET } = env;
    this.setPrivateDataset(PRIVATE_DATASET, USAGE);
    this.setPublicDataset(PUBLIC_DATASET, USAGE);
    // Eventually: this.setTraceParent(request);
  }

  public setPrivateDataset(
    dataset: unknown,
    usage: AnalyticsEngineDataset,
  ): void {
    if (typeof dataset === 'undefined') {
      this.emitPublicMetric({
        name: MetricName.MissingPrivateDataset,
      });
      return;
    }

    if (!isAnaylticsEngineDataset(dataset)) {
      this.emitPublicMetric({
        name: MetricName.InvalidPrivateDataset,
        type: typeof dataset,
      });
      this.logPrivateError(
        new Error('Invalid private dataset', {
          cause: JSON.stringify(dataset),
        }),
      );
      return;
    }

    const emit = mapAnalyticsEngineDatasetToEmitter(dataset);
    this.onPrivateMetric(emit);
    this.onPrivateMetric((): void => {
      usage.writeDataPoint({
        doubles: [UsageType.AnalyticsEngineDatasetWriteDataPoint, 1],
        indexes: [AccountNumber.Quisido.toString()], // account number
      });
    });
  }

  public setPublicDataset(
    dataset: unknown,
    usage: AnalyticsEngineDataset,
  ): void {
    if (typeof dataset === 'undefined') {
      this.emitPublicMetric({
        name: MetricName.MissingPublicDataset,
      });
      return;
    }

    if (!isAnaylticsEngineDataset(dataset)) {
      this.emitPublicMetric({
        name: MetricName.InvalidPublicDataset,
        type: typeof dataset,
      });
      this.logPrivateError(
        new Error('Invalid public dataset', {
          cause: JSON.stringify(dataset),
        }),
      );
      return;
    }

    const emit = mapAnalyticsEngineDatasetToEmitter(dataset);
    this.onPublicMetric(emit);
    this.onPublicMetric((): void => {
      usage.writeDataPoint({
        doubles: [UsageType.AnalyticsEngineDatasetWriteDataPoint, 1],
        indexes: [AccountNumber.Quisido.toString()], // account number
      });
    });
  }

  public setTraceParent(request: Request): void {
    try {
      const traceParent: TraceParent | null = mapRequestToTraceParent(request);
      if (traceParent === null) {
        this.emitPublicMetric({
          name: MetricName.InvalidTraceParent,
        });
        return;
      }

      this.addPublicDimensions(mapTraceParentToDimensions(traceParent));
    } catch (err: unknown) {
      this.logPublicError(mapUnknownToError(err));
      this.emitPublicMetric({
        name: MetricName.InvalidTraceParent,
      });
    }
  }
}
