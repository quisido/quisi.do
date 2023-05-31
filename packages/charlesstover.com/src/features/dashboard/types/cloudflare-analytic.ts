export default interface CloudflareAnalytic {
  readonly avg?: number | undefined;
  readonly max?: number | undefined;
  readonly min?: number | undefined;
  readonly name: string;
  readonly p25?: number | undefined;
  readonly p50: number;
  readonly p75: number;
  readonly p90: number;
  readonly p99: number;
  readonly p999?: number | undefined;
  readonly sum?: number | undefined;
  readonly unit?:
    | 'bytes'
    | 'microseconds'
    | 'milliseconds'
    | 'seconds'
    | undefined;
}
