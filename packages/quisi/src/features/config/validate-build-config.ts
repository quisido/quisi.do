import { boolean, strictObject, type ZodType } from 'zod';
import type BuildConfig from './build-config.js';

const ZodBuildConfig: ZodType<BuildConfig> = strictObject({
  skipLibCheck: boolean().optional(),
}).partial();

export default function validateBuildConfig(config: unknown): BuildConfig {
  return ZodBuildConfig.parse(config);
}
