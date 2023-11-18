export default function mapWindowToHash(wndw: Window | undefined): string {
  if (typeof wndw === 'undefined') {
    return '';
  }
  return wndw.location.hash;
}
