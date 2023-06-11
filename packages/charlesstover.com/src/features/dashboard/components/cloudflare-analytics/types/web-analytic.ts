export default interface CloudflareWebAnalytic {
  readonly avg: number;
  readonly name: string;
  readonly p50: number;
  readonly p75: number;
  readonly p90: number;
  readonly p99: number;
  readonly unit: 'bytes' | 'microseconds' | 'milliseconds' | 'seconds';
}
