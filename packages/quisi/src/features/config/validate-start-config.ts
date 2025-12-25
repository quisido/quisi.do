import { boolean, object, type ZodType } from 'zod';
import type StartConfig from './start-config.js';

const ZodStartConfig: ZodType<StartConfig> = object({
  skipLibCheck: boolean().optional(),
}).partial();

export default function validateStartConfig(config: unknown): StartConfig {
  return ZodStartConfig.parse(config);
}
