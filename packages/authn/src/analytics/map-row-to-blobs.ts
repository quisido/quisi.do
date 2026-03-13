import type { AnalyticsEngineRow } from 'cloudflare-utils';

export default function mapRowToBlobs(
  row: AnalyticsEngineRow,
): readonly string[] {
  return [
    row.blob1,
    row.blob2,
    row.blob3,
    row.blob4,
    row.blob5,
    row.blob6,
    row.blob7,
    row.blob8,
    row.blob9,
    row.blob10,
    row.blob11,
    row.blob12,
    row.blob13,
    row.blob14,
    row.blob15,
    row.blob16,
    row.blob17,
    row.blob18,
    row.blob19,
    row.blob20,
  ];
}
