import getRequest from './get-request.js';

export default function getRequestPathname(): string {
  const { url } = getRequest();
  const { pathname } = new URL(url);
  return pathname;
}
