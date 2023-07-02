export default interface CloudflareWebAnalytic {
  readonly avg?: number | undefined;
  readonly goal?: 'high' | 'low' | undefined;
  readonly name: string;
  readonly p50?: number | undefined;
  readonly p75?: number | undefined;
  readonly p90?: number | undefined;
  readonly p99?: number | undefined;
  readonly unit: 'bytes' | 'microseconds' | 'milliseconds' | 'seconds';
}
