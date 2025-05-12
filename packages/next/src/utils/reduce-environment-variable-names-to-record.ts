import { config } from 'dotenv';

const processEnv: Record<string, string> = {
  NODE_ENV: process.env.NODE_ENV,
};

config({ override: true, processEnv });

export default function reduceEnvironmentVariableNamesToRecord(
  record: Record<string, string | undefined>,
  name: string,
): Record<string, string | undefined> {
  return {
    ...record,
    [`import.meta.env.${name}`]: JSON.stringify(processEnv[name]),
  };
}
