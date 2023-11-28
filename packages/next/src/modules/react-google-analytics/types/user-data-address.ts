import type PostalCode from './postal-code.js';
import type SingleLetter from './single-letter.js';

export default interface UserDataAddress {
  readonly city?: string | undefined;
  readonly country?: `${SingleLetter}${SingleLetter}` | undefined;
  readonly firstName?: string | undefined;
  readonly firstNameSha256?: string | undefined;
  readonly lastName?: string | undefined;
  readonly lastNameSha256?: string | undefined;
  readonly postalCode?: PostalCode | undefined;
  readonly region?: string | undefined;
  readonly street?: string | undefined;
}
