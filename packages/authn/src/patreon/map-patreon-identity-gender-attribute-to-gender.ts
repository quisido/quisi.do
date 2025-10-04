import { type Gender } from '../constants/gender.js';
import isPatreonGender from '../utils/is-patreon-gender.js';
import mapPatreonGenderToGender from '../utils/map-patreon-gender-to-gender.js';

export default function mapPatreonIdentityGenderAttributeToGender(
  value: unknown,
): Gender | undefined {
  if (!isPatreonGender(value)) {
    return;
  }

  return mapPatreonGenderToGender(value);
}
