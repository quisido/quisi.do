import type PostalCode from './postal-code.js';
import type SingleLetter from './single-letter.js';

export default interface GoogleAnalyticsUserDataAddress {
  readonly city?: string | undefined;
  readonly country?: `${SingleLetter}${SingleLetter}` | undefined;
  readonly first_name?: string | undefined;
  readonly last_name?: string | undefined;
  readonly postal_code?: PostalCode | undefined;
  readonly region?: string | undefined;
  readonly sha256_first_name?: string | undefined;
  readonly sha256_last_name?: string | undefined;
  readonly street?: string | undefined;
}
