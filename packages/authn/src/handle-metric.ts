import type { Handler } from '@quisido/worker';

const JSON_SPACE = 2;

export default function handleMetric(
  this: Handler,
  name: string,
  dimensions: Record<number | string | symbol, boolean | number | string>,
): void {
  const dimensionsStr: string = JSON.stringify(dimensions, null, JSON_SPACE);
  this.console.log(name, dimensionsStr);
  this.writeMetricDataPoint('PUBLIC_DATASET', name, dimensions);
}
