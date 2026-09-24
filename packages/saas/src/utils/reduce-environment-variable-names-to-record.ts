import { config } from 'dotenv';
import validateString from './validate-string.js';
import mapNodeEnvToEnvPath from './map-node-env-to-env-path.js';

// ESLint prefers dot notation, because it is using bun types.
// TypeScript prefers bracket notation, because it is using Node types.
// eslint-disable-next-line @typescript-eslint/dot-notation
const NODE_ENV: string = validateString(process.env['NODE_ENV']);

const processEnv: Record<string, string> = {
  NODE_ENV,
};

config({
  path: mapNodeEnvToEnvPath(NODE_ENV),
  processEnv,
});

export default function reduceEnvironmentVariableNamesToRecord(
  record: Record<string, string | undefined>,
  name: string,
): Record<string, string | undefined> {
  return {
    ...record,
    [`import.meta.env.${name}`]: JSON.stringify(processEnv[name]),
  };
}
