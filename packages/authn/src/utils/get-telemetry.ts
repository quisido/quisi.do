import { type Telemetry } from '@quisido/workers-shared';
import { type AuthnMetric } from '../types/authn-metric.js';
import getState from './get-state.js';

export default function getTelemetry(): Telemetry<AuthnMetric> {
  const { telemetry } = getState();
  return telemetry;
}
