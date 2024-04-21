import PatreonGender from '../constants/patreon-gender.js';

const PATREON_GENDERS: Set<unknown> =
  new Set<unknown>(Object.values(PatreonGender));

export default function isPatreonGender(
  value: unknown,
): value is PatreonGender {
  return PATREON_GENDERS.has(value);
}
