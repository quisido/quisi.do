import type { Handler, MetricDimensions } from '@quisido/worker';
import mapDimensionsToString from '../utils/map-dimensions-to-string.js';

const MAGIC_NUMBER = 15; // tongue-in-cheek

export const emitPublicly = (
  handler: Handler,
  name: string,
  subdimensions: MetricDimensions,
): void => {
  const subdimensionsStr: string = mapDimensionsToString(subdimensions);
  handler.log('-'.repeat(name.length + MAGIC_NUMBER));
  handler.log('Public metric:', name);
  handler.log(subdimensionsStr);
  handler.writeMetricDataPoint('PUBLIC_DATASET', name, subdimensions);
};

export const emitPrivately = (
  handler: Handler,
  name: string,
  subdimensions: MetricDimensions,
): void => {
  const subdimensionsStr: string = mapDimensionsToString(subdimensions);
  handler.log('------------------------');
  handler.log('Private metric:', name);
  handler.log(subdimensionsStr);
  handler.writeMetricDataPoint('PRIVATE_DATASET', name, subdimensions);
};
