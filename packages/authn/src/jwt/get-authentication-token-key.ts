import { base64url } from 'jose';
import type AuthnFetchHandler from '../authn-fetch-handler.js';

const KEY_BYTES = 32;
const KEY_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

const isEncryptionSecret = (value: unknown): value is string => {
  if (typeof value !== 'string' || !KEY_PATTERN.test(value)) {
    return false;
  }

  const key: Uint8Array = base64url.decode(value);
  return key.length === KEY_BYTES && base64url.encode(key) === value;
};

export default function getAuthenticationTokenKey(
  this: AuthnFetchHandler,
): Uint8Array {
  return base64url.decode(
    this.validateBinding('JWT_ENCRYPTION_SECRET', isEncryptionSecret),
  );
}
