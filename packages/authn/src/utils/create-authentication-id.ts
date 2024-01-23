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
