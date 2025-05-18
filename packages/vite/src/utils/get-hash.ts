const FIRST_CHARACTER = 1;

export default function getHash(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.hash.slice(FIRST_CHARACTER);
}
