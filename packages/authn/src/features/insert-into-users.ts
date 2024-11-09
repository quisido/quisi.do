import { type Gender } from '../constants/gender.js';
import { INSERT_INTO_USERS_QUERY } from '../constants/queries.js';
import nowSeconds from '../features/now-seconds.js';
import type AuthnFetchHandler from './authn-fetch-handler.js';

interface Options {
  readonly firstName: string | null;
  readonly fullName: string | null;
  readonly gender: Gender;
}

export default async function insertIntoUsers(
  this: AuthnFetchHandler,
  { firstName, fullName, gender }: Options,
): Promise<D1Meta> {
  const registrationTimestamp: number = nowSeconds.call(this);

  const { meta } = await this.query(INSERT_INTO_USERS_QUERY, [
    firstName,
    fullName,
    gender,
    registrationTimestamp,
  ]);

  return meta;
}
