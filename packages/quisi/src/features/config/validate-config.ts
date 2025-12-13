import { number, object, type ZodType } from 'zod';
import type { Config } from './config.js';
import type { Coverage } from './coverage.js';

const ZodCoverage: ZodType<Coverage> = object({
  branches: number().optional(),
  functions: number().optional(),
  lines: number().optional(),
  statements: number().optional(),
}).partial();

const ZodConfig: ZodType<Config> = object({
  coverage: ZodCoverage.optional(),
}).partial();

export default function validateConfig(config: unknown): Config {
  return ZodConfig.parse(config);
}
