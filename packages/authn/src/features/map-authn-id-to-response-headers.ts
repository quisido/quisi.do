import DEFAULT_RETURN_HREF from '../constants/default-return-href.js';
import { SECONDS_PER_DAY } from "../constants/time.js";
import getReturnHref from "../utils/get-return-href.js";
import getCookieDomain from "./get-cookie-domain.js";

export default function mapAuthnIdToResponseHeaders(authnId: string): Headers {
  const cookieDomain: string = getCookieDomain();
  const returnHref: string = getReturnHref() ?? DEFAULT_RETURN_HREF;

  return new Headers({
    'Content-Location': returnHref,
    Location: returnHref,
    'Set-Cookie': [
      `__Secure-Authentication-ID=${authnId}`,
      `Domain=${cookieDomain}`,
      `Max-Age=${SECONDS_PER_DAY.toString()}`,
      'Partitioned',
      'Path=/',
      'SameSite=Lax',
      'Secure',
    ].join('; '),
  });
}
