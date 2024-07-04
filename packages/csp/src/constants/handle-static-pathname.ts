import {
  FAVICON_RESPONSE_BODY,
  FAVICON_RESPONSE_INIT,
  ROBOTS_RESPONSE_BODY,
  ROBOTS_RESPONSE_INIT,
} from '../constants/responses.js';
import { StaticPathname } from '../constants/static-pathname.js';

export default function handleStaticPathname(
  pathname: StaticPathname,
): Response {
  switch (pathname) {
    case StaticPathname.Favicon:
      return new Response(FAVICON_RESPONSE_BODY, FAVICON_RESPONSE_INIT);
    case StaticPathname.Robots:
      return new Response(ROBOTS_RESPONSE_BODY, ROBOTS_RESPONSE_INIT);
  }
}
