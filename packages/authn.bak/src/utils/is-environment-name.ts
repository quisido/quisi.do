import { EnvironmentName } from '../constants/environment-name.js';

const ENVIRONMENT_NAMES: Set<unknown> = new Set<unknown>(
  Object.values(EnvironmentName),
);

export default function isEnvironmentName(
  value: unknown,
): value is EnvironmentName {
  return ENVIRONMENT_NAMES.has(value);
}
