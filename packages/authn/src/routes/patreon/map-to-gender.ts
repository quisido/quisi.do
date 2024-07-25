import Gender from '../../constants/gender.js';
import isPatreonGender from '../../utils/is-patreon-gender.js';
import mapPatreonGenderToGender from '../../utils/map-patreon-gender-to-gender.js';

export default function mapToGender(value: unknown): Gender {
  if (!isPatreonGender(value)) {
    return Gender.Neutral;
  }

  return mapPatreonGenderToGender(value);
}
