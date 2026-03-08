import { type MetricDimensions } from '@quisido/worker';

const pickDimensions = (
  dimensions: MetricDimensions,
  keys: readonly string[],
): MetricDimensions => {
  const result: MetricDimensions = {};
  for (const key of keys) {
    result[key] = dimensions[key];
  }
  return result;
};

export default pickDimensions;
