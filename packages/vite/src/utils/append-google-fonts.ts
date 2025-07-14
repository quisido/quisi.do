import GoogleFontsSearchParams from './google-fonts-search-params.js';

export default function appendGoogleFonts(
  fonts: Record<string, number | readonly number[]>,
  nonce: string,
): void {
  const params: URLSearchParams = new GoogleFontsSearchParams(fonts);
  const paramsStr: string = params.toString();

  const link: HTMLLinkElement = window.document.createElement('link');
  link.setAttribute('crossorigin', 'anonymous');
  link.setAttribute('href', `https://fonts.googleapis.com/css2?${paramsStr}`);
  link.setAttribute('nonce', nonce);
  link.setAttribute('rel', 'stylesheet');
  window.document.head.appendChild(link);
}
