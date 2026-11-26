import { type MetricDimensions } from '@quisido/worker';

export default function pickDimensions(
  dimensions: MetricDimensions,
  keys: readonly string[],
): MetricDimensions {
  const picked: MetricDimensions = {};
  for (const key of keys) {
    const value: string | number | boolean | undefined = dimensions[key];
    if (typeof value !== 'undefined') {
      picked[key] = value;
    }
  }
  return picked;
}
