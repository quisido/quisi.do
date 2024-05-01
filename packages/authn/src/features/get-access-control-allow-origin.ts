import getCookieDomain from "./get-cookie-domain.js";

export default function getAccessControlAllowOrigin(): string {
  const cookieDomain: string = getCookieDomain();

  if (cookieDomain === 'localhost') {
    return 'https://localhost:3000';
  }

  return `https://${cookieDomain}`;
}
