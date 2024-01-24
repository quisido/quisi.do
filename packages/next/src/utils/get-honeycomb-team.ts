import mapHostnameToHoneycombTeam from './map-hostname-to-honeycomb-team.js';

export default function getHoneycombTeam(): string {
  return mapHostnameToHoneycombTeam(window.location.hostname);
}
