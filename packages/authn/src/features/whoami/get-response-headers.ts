import getAccessControlAllowOrigin from "../get-access-control-allow-origin.js";
import { HEADERS_INIT } from "./headers-init.js";

export default function getResponseHeaders(): Headers {
  return new Headers({
    ...HEADERS_INIT,
    'Access-Control-Allow-Origin': getAccessControlAllowOrigin(),
  });
}
