import Environment from '../constants/environment.js';

const ENVIRONMENTS_SET: Set<unknown> = new Set(Object.values(Environment));

export default function isEnvironment(value: unknown): value is Environment {
  return ENVIRONMENTS_SET.has(value);
}
