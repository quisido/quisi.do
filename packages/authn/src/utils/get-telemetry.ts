import type { Metric } from '../types/metric.js';
import getState from './get-state.js';
import type Telemetry from './telemetry.js';

export default function getTelemetry(): Telemetry<Metric> {
  const { telemetry } = getState();

  if (telemetry === null) {
    throw new Error('Expected the state to contain telemetry.');
  }

  return telemetry;
}
