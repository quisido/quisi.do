import mapPlatformToNpmCommand from './map-platform-to-npm-command.js';

const { platform: PLATFORM } = process;

export default function getNpmCommand(): readonly [
  string,
  ...(readonly string[]),
] {
  return mapPlatformToNpmCommand(PLATFORM);
}
