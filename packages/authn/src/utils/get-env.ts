import getState from './get-state.js';

export default function getEnv(): Record<string, unknown> {
  const { env } = getState();
  return env;
}
