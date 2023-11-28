export default interface CloudflareWorkersInvocationsAnalytic {
  readonly goal?: 'high' | 'low' | undefined;
  readonly max: number;
  readonly min?: number | undefined;
  readonly name: string;
  readonly p25?: number | undefined;
  readonly p50?: number | undefined;
  readonly p75: number;
  readonly p90: number;
  readonly p99: number;
  readonly p999: number;
  readonly sum?: number | undefined;
  readonly unit: 'bytes' | 'microseconds' | 'milliseconds' | 'seconds';
}
