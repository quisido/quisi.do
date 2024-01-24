/**
 *                                 !! WARNING !!
 *
 *   By using exclusively cookie-safe characters, we do not need to surround the
 * Authentication ID with quotation marks when passing it via `Set-Cookie`. If
 * this function were to be refactored, the `Set-Cookie` header must also be
 * refactored.
 *   Note: Using `Set-Cookie: name="value"` will still store the value as
 * `"value"` on the client, adding 2 more bytes and ruining our perfect 64-byte
 * string. 🙁 By using cookie-safe characters, we can avoid using these
 * quotation marks.
 *
 *                                 !! WARNING !!
 */

/**
 *   A cookie value can include any US-ASCII character excluding control
 * characters (ASCII characters 0 up to 31 and ASCII character 127), Whitespace,
 * double quotes, commas, semicolons, and backslashes.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 */

const LENGTH = 64;
const COOKIE_VALUE_CHARACTERS =
  "!#$%&'()*+-./0123456789:<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";

const mapToRandomCookieValueCharacter = (): string => {
  const index: number = Math.floor(
    Math.random() * COOKIE_VALUE_CHARACTERS.length,
  );
  return COOKIE_VALUE_CHARACTERS.charAt(index);
};

export default function createAuthenticationId(): string {
  return new Array(LENGTH)
    .fill(null)
    .map(mapToRandomCookieValueCharacter)
    .join('');
}
