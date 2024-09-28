import { Gender } from '../constants/gender.js';
import { PatreonGender } from '../constants/patreon-gender.js';

export default function mapPatreonGenderToGender(
  gender: PatreonGender,
): Gender {
  switch (gender) {
    case PatreonGender.Female:
      return Gender.Female;
    case PatreonGender.Male:
      return Gender.Male;
    case PatreonGender.Neutral:
      return Gender.Neutral;
  }
}
