import type { AnalyticsEngineRow } from 'cloudflare-utils';

export default function mapRowToDoubles(
  row: AnalyticsEngineRow,
): readonly number[] {
  return [
    row.double1,
    row.double2,
    row.double3,
    row.double4,
    row.double5,
    row.double6,
    row.double7,
    row.double8,
    row.double9,
    row.double10,
    row.double11,
    row.double12,
    row.double13,
    row.double14,
    row.double15,
    row.double16,
    row.double17,
    row.double18,
    row.double19,
    row.double20,
  ];
}
