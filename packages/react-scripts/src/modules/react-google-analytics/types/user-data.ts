import type PhoneNumber from './phone-number';
import type UserDataAddress from './user-data-address';

export default interface UserData {
  readonly address?: UserDataAddress | undefined;
  readonly email?: string | undefined;
  readonly emailAddressSha256?: string | undefined;
  readonly phoneNumber?: PhoneNumber | undefined;
  readonly phoneNumberSha256?: string | undefined;
}
