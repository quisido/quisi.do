import { Product, UsageType } from '@quisido/workers-shared';

const ONCE = 1;
const SINGLE = 1;

export default function mapProjectIdToD1ReadDoubles(
  projectId: number,
): number[] {
  return [
    Product.ContentSecurityPolicy,
    projectId,
    UsageType.D1Read,
    ONCE,
    SINGLE,
  ];
}
