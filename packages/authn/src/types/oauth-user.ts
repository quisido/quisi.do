import type Gender from '../constants/gender.js';

export default interface OAuthUser {
  readonly email: string;
  readonly firstName: string;
  readonly fullName: string;
  readonly gender: Gender;
  readonly id: string;
}
