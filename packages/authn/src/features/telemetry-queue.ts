import { mapUnknownToError } from 'map-reduce-sort';
import MetricName from '../constants/metric-name.js';
import type { TraceParent } from '../modules/trace-parent/index.js';
import type { Metric } from '../types/metric.js';
import isAnaylticsEngineDataset from '../utils/is-analytics-engine-dataset.js';
import mapAnalyticsEngineDatasetToEmitter from '../utils/map-analytics-dataset-engine-to-emitter.js';
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

const mapNumberToHex = (n: number): string => {
  const str: string = n.toString(HEXADECIMAL);
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
  traceId: traceId.map(mapNumberToHex).join(''),
  traceParentId: parentId.map(mapNumberToHex).join(''),
  traceFlags,
  traceVersion: version,
});

export default class AuthenticationTelemetryQueue extends TelemetryQueue<Metric> {
  private readonly _ctx: ExecutionContext;

  public constructor(
    env: Record<string, unknown>,
    ctx: ExecutionContext,
    traceId: string,
  ) {
    super();
    this._ctx = ctx;

    this.addPublicDimensions({
      ...DEFAULT_PUBLIC_METRIC_DIMENSIONS,
      timestamp: Date.now(),
      traceId,
    });

    const { PRIVATE_DATASET, PUBLIC_DATASET } = env;
    this.setPrivateDataset(PRIVATE_DATASET);
    this.setPublicDataset(PUBLIC_DATASET);
    // this.setTraceParent(request);
  }

  public onSideEffect(metricName: MetricName, promise: Promise<void>): void {
    const startTime: number = Date.now();
    this._ctx.waitUntil(
      promise
        .then((): void => {
          this.emitPublicMetric({
            endTime: Date.now(),
            name: metricName,
            startTime,
            success: 1,
          });
        })
        .catch((err: unknown): void => {
          this.emitPublicMetric({
            endTime: Date.now(),
            name: metricName,
            startTime,
            success: 0,
          });
          this.logPrivateError(
            new Error(`Side effect \`${metricName}\` failed.`, { cause: err }),
          );
        }),
    );
  }

  public setPrivateDataset(dataset: unknown): void {
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
  }

  public setPublicDataset(dataset: unknown): void {
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
      this.emitPublicMetric({
        name: MetricName.InvalidTraceParent,
      });
      this.logPublicError(mapUnknownToError(err));
    }
  }
}
