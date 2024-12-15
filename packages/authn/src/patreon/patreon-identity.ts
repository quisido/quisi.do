import { type Gender } from '../constants/gender.js';

export default interface PatreonIdentity {
  readonly email?: string | undefined;
  readonly firstName?: string | undefined;
  readonly fullName?: string | undefined;
  readonly gender?: Gender | undefined;
  readonly id: string;
  readonly isEmailVerified?: boolean | undefined;
}
