import { number, strictObject, type ZodType } from 'zod';
import type Coverage from './coverage.js';
import type TestConfig from './test-config.js';

const ZodCoverage: ZodType<Coverage> = strictObject({
  branches: number().optional(),
  functions: number().optional(),
  lines: number().optional(),
  statements: number().optional(),
}).partial();

const ZodTestConfig: ZodType<TestConfig> = strictObject({
  coverage: ZodCoverage.optional(),
}).partial();

export default function validateTestConfig(config: unknown): TestConfig {
  return ZodTestConfig.parse(config);
}
