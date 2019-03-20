export default interface UptimeChecks {
  readonly errors: unknown[];
  readonly lastChecked: number;
  readonly messages: unknown[];
  readonly status: 'OFFLINE' | 'ONLINE';
}
