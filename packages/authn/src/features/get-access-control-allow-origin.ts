import getRequest from "../utils/get-request.js";
import getCookieDomain from "./get-cookie-domain.js";

export default function getAccessControlAllowOrigin(): string {
  const request: Request = getRequest();

  /**
   * Allow `localhost` for Lighthouse reports in CI.
   * The HTTP protocol is for `serve`; the HTTPS protocol is for `dev`.
   */
  const origin: string | null = request.headers.get('Origin');
  if (origin === null) {
    return '*';
  }

  if (
    origin === 'http://localhost:3000' ||
    origin === 'https://localhost:3000'
  ) {
    return origin;
  }

  const cookieDomain: string = getCookieDomain();
  return `https://${cookieDomain}`;
}
