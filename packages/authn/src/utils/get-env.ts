import getState from './get-state.js';

export default function getEnv(): Record<string, unknown> {
  const { env } = getState();

  if (env === null) {
    throw new Error('Expected the state to contain an isolate environment.');
  }

  return env;
}
