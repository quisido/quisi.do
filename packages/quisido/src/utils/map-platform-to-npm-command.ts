export default function mapPlatformToNpmCommand(
  _platform: NodeJS.Platform,
): readonly [string, ...(readonly string[])] {
  return ['pnpm'];
}
