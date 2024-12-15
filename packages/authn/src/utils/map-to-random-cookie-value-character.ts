const COOKIE_VALUE_CHARACTERS =
  "!#$%&'()*+-./0123456789:<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";

export default function mapToRandomCookieValueCharacter(): string {
  const index: number = Math.floor(
    Math.random() * COOKIE_VALUE_CHARACTERS.length,
  );
  return COOKIE_VALUE_CHARACTERS.charAt(index);
}
