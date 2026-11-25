import { type MetricDimensions } from '@quisido/worker';

export default function pickDimensions(
  dimensions: MetricDimensions,
  keys: readonly string[],
): MetricDimensions {
  const picked: MetricDimensions = {};
  for (const key of keys) {
    picked[key] = dimensions[key];
  }
  return picked;
}
