import {
  MetricName as WorkerMetricName,
  type Handler,
  type MetricDimensions,
} from '@quisido/worker';
import { PUBLIC } from './constants/metric-dimensions.js';
import { MetricName } from './constants/metric-name.js';
import isWorkerMetricName from './utils/is-worker-metric-name.js';
import mapDimensionsToString from './utils/map-dimensions-to-string.js';

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: MetricDimensions,
): void {
  const emitPublicly = (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    this.log('------------------------');
    this.log('Public metric:', name);
    this.log(subdimensionsStr);
    this.writeMetricDataPoint('PUBLIC_DATASET', name, subdimensions);
  };

  const emitPrivately = (subdimensions: MetricDimensions): void => {
    const subdimensionsStr: string = mapDimensionsToString(subdimensions);
    this.log('------------------------');
    this.log('Private metric:', name);
    this.log(subdimensionsStr);
    this.writeMetricDataPoint('PRIVATE_DATASET', name, subdimensions);
  };

  if (isWorkerMetricName(name)) {
    const emitInvalidWorkerMetric = (): void => {
      handleMetric.call(this, MetricName.InvalidWorkerMetric, {
        dimensions: JSON.stringify(dimensions),
        name,
      });
    };

    switch (name) {
      case WorkerMetricName.D1PreparedStatementAll: {
        const {
          changedDb,
          changes,
          duration,
          endTime,
          env,
          lastRowId,
          query,
          results,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        } = dimensions;
        if (
          typeof changedDb !== 'boolean' ||
          typeof changes !== 'number' ||
          typeof duration !== 'number' ||
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof lastRowId !== 'number' ||
          typeof query !== 'string' ||
          typeof results !== 'number' ||
          typeof rowsRead !== 'number' ||
          typeof rowsWritten !== 'number' ||
          typeof sizeAfter !== 'number' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPrivately({
          changedDb,
          changes,
          duration,
          endTime,
          env,
          lastRowId,
          query,
          results,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        });

        emitPublicly({
          changedDb,
          changes,
          duration,
          endTime,
          env,
          results,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        });
        return;
      }

      case WorkerMetricName.D1PreparedStatementAllError:
      case WorkerMetricName.D1PreparedStatementRunError: {
        const { endTime, env, query, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof query !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPrivately({
          endTime,
          env,
          query,
          startTime,
        });

        emitPublicly({
          endTime,
          env,
          startTime,
        });
        return;
      }

      case WorkerMetricName.D1PreparedStatementRun: {
        const {
          changedDb,
          changes,
          duration,
          endTime,
          env,
          lastRowId,
          query,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        } = dimensions;
        if (
          typeof changedDb !== 'boolean' ||
          typeof changes !== 'number' ||
          typeof duration !== 'number' ||
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof lastRowId !== 'number' ||
          typeof query !== 'string' ||
          typeof rowsRead !== 'number' ||
          typeof rowsWritten !== 'number' ||
          typeof sizeAfter !== 'number' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPrivately({
          changedDb,
          changes,
          duration,
          endTime,
          env,
          lastRowId,
          query,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        });

        emitPublicly({
          changedDb,
          changes,
          duration,
          endTime,
          env,
          rowsRead,
          rowsWritten,
          sizeAfter,
          startTime,
        });
        return;
      }

      case WorkerMetricName.Fetch: {
        const { endTime, startTime, url } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof startTime !== 'number' ||
          typeof url !== 'string'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        try {
          const { origin } = new URL(url);
          emitPrivately({ endTime, startTime, url });
          emitPublicly({ endTime, origin, startTime });
          return;
        } catch (_err: unknown) {
          emitInvalidWorkerMetric();
          return;
        }
      }

      case WorkerMetricName.InvalidBinding: {
        const { key, type, value } = dimensions;
        if (
          typeof key !== 'string' ||
          typeof type !== 'string' ||
          typeof value !== 'string'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPrivately({ key, value });
        emitPublicly({ key, type });
        return;
      }

      case WorkerMetricName.KVNamespaceGet: {
        const { endTime, key, namespace, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof key !== 'string' ||
          typeof namespace !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPrivately({ endTime, key, namespace, startTime });
        emitPublicly({ endTime, namespace, startTime });
        return;
      }

      case WorkerMetricName.KVNamespaceGetError: {
        const { endTime, env, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPublicly({ endTime, env, startTime });
        return;
      }

      case WorkerMetricName.KVNamespacePut: {
        const { endTime, env, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPublicly({ endTime, env, startTime });
        return;
      }

      case WorkerMetricName.KVNamespacePutError: {
        const { endTime, env, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPublicly({ endTime, env, startTime });
        return;
      }

      case WorkerMetricName.R2BucketPut: {
        const { endTime, env, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPublicly({ endTime, env, startTime });
        return;
      }

      case WorkerMetricName.R2BucketPutError: {
        const { endTime, env, startTime } = dimensions;
        if (
          typeof endTime !== 'number' ||
          typeof env !== 'string' ||
          typeof startTime !== 'number'
        ) {
          emitInvalidWorkerMetric();
          return;
        }

        emitPublicly({ endTime, env, startTime });
        return;
      }
    }
  }

  // Custom metrics
  if (!Object.hasOwn(dimensions, PUBLIC)) {
    this.logError(
      new Error('Attempted to emit a metric without explicit accessibility.', {
        cause: { dimensions, name },
      }),
    );
    return;
  }

  const { [PUBLIC]: isPublic, ...newDimensions } = dimensions;
  if (typeof isPublic !== 'boolean') {
    this.logError(
      new Error('Attempted to emit a metric with invalid accessibility.', {
        cause: { dimensions, name },
      }),
    );
    return;
  }

  if (isPublic) {
    emitPublicly(newDimensions);
  } else {
    emitPrivately(newDimensions);
  }
}
