import type UptimeChecks from '../types/uptime-checks.js';
import OnlineOrNot, {
  type UptimeChecks as OnlineOrNotUptimeChecks,
} from './online-or-not';

const mapOnlineOrNotUptimeChecksToUptimeChecks = ({
  errors,
  messages,
  result,
}: Readonly<OnlineOrNotUptimeChecks>): UptimeChecks => ({
  errors,
  lastChecked: new Date(result.lastQueued).getTime(),
  messages,
  status: result.status,
});

export default async function handleUptimeChecksRequest(): Promise<UptimeChecks> {
  const ONLINE_OR_NOT: OnlineOrNot = new OnlineOrNot({
    fetch: window.fetch.bind(window),
    id: '9NK7GzKy',
    token: 'O-Y6-0zuUBd1NzpNrQlNl8phdpX26jye__vIZife',
  });

  const checks: OnlineOrNotUptimeChecks = await ONLINE_OR_NOT.check();
  return mapOnlineOrNotUptimeChecksToUptimeChecks(checks);
}
