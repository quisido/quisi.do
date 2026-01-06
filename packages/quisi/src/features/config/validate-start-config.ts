import { boolean, strictObject, type ZodType } from 'zod';
import type StartConfig from './start-config.js';

const ZodStartConfig: ZodType<StartConfig> = strictObject({
  skipLibCheck: boolean().optional(),
}).partial();

export default function validateStartConfig(config: unknown): StartConfig {
  return ZodStartConfig.parse(config);
}
