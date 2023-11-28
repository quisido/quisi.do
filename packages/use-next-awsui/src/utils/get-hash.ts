export default function getHash(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.hash;
}
