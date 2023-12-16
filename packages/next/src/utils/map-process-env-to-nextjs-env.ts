import mapDictToRecord from './map-dict-to-record';

export default function mapProcessEnvToNextJsEnv(
  env: NodeJS.ProcessEnv,
): Record<string, string> {
  return mapDictToRecord({
    ...env,
    __COMPAT_LAYER: undefined,
    __NEXT_PROCESSED_ENV: undefined,
    NEXT_RUNTIME: undefined,
    NODE_ENV: undefined,
    NODE_OPTIONS: undefined,
  });
}
