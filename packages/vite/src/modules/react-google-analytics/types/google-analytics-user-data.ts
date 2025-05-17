import type GoogleAnalyticsUserDataAddress from './google-analytics-user-data-address.js';
import type PhoneNumber from './phone-number.js';

export default interface GoogleAnalyticsUserData {
  readonly address?: GoogleAnalyticsUserDataAddress | undefined;
  readonly email?: string | undefined;
  readonly phone_number?: PhoneNumber | undefined;
  readonly sha256_email_address?: string | undefined;
  readonly sha256_phone_number?: string | undefined;
}
