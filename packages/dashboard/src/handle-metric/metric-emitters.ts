import { type MetricDimensions } from '@quisido/worker';

export default interface MetricEmitters {
  readonly emitInvalidWorkerMetric: () => void;
  readonly emitPrivately: (dimensions: MetricDimensions) => void;
  readonly emitPublicly: (dimensions: MetricDimensions) => void;
}
