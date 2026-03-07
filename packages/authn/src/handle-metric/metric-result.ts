import type { MetricDimensions } from '@quisido/worker';

export default interface MetricResult {
  readonly privateDimensions?: MetricDimensions;
  readonly publicDimensions?: MetricDimensions;
}
