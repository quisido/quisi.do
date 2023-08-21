import type UptimeChecks from '../types/uptime-checks';
import type { UptimeChecks as OnlineOrNotUptimeChecks } from './online-or-not';
import OnlineOrNot from './online-or-not';

const ONLINE_OR_NOT: OnlineOrNot = new OnlineOrNot({
  fetch: window.fetch.bind(window),
  id: '9NK7GzKy',
  token: 'O-Y6-0zuUBd1NzpNrQlNl8phdpX26jye__vIZife',
});

function mapOnlineOrNotUptimeChecksToUptimeChecks({
  errors,
  messages,
  result,
}: Readonly<OnlineOrNotUptimeChecks>): UptimeChecks {
  return {
    errors,
    messages,
    lastChecked: new Date(result.lastQueued).getTime(),
    status: result.status,
  };
}

export default async function handleUptimeChecksRequest(): Promise<UptimeChecks> {
  const checks: OnlineOrNotUptimeChecks = await ONLINE_OR_NOT.check();
  return mapOnlineOrNotUptimeChecksToUptimeChecks(checks);
}
