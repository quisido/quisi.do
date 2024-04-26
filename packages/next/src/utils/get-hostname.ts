export default function getHostname(): string {
  if (typeof window === 'undefined') {
    return 'localhost';
  }

  return window.location.hostname;
}
