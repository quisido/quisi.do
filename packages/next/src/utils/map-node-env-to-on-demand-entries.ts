import { type NextConfig } from 'next';

const MILLISECONDS_PER_SECOND = 1000;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;

export default function mapNodeEnvToOnDemandEntries(
  env: NodeJS.ProcessEnv['NODE_ENV'],
): NextConfig['onDemandEntries'] {
  if (env !== 'development') {
    return;
  }

  return {
    pagesBufferLength: 1024,

    maxInactiveAge:
      MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND,
  };
}
