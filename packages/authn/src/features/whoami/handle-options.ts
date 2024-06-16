import StatusCode from '../../constants/status-code.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default function handleOptions(): Response {
  return new Response(null, {
    headers: getWhoAmIResponseHeaders(),
    status: StatusCode.OK,
  });
}
