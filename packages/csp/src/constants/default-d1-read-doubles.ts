import { Product, UsageType } from '@quisido/workers-shared';

const DEFAULT_PROJECT_ID = 0;
const ONCE = 1;
const SINGLE = 1;

export const DEFAULT_D1_READ_DOUBLES: number[] = [
  Product.ContentSecurityPolicy,
  DEFAULT_PROJECT_ID,
  UsageType.D1Read,
  ONCE,
  SINGLE,
];
