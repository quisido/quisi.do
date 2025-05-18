import { config } from 'dotenv';
import validateString from './validate-string.js';
import mapNodeEnvToEnvPath from './map-node-env-to-env-path.js';

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
