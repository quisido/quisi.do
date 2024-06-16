import getRequest from '../utils/get-request.js';
import mapRequestToPathname from '../utils/map-request-to-pathname.js';

export default function getRequestPathname(): string {
  const request: Request = getRequest();
  return mapRequestToPathname(request);
}
