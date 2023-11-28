import mapHostnameToHoneycombTeam from './map-hostname-to-honeycomb-team';

export default function getHoneycombTeam(): string {
  return mapHostnameToHoneycombTeam(window.location.hostname);
}
