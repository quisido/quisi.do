import { StatusCode } from 'cloudflare-utils';
import mapHostToRootResponseHeaders from './map-host-to-root-response-headers.js';

export default class RootResponse extends Response {
  public constructor(host: string) {
    super(null, {
      headers: mapHostToRootResponseHeaders(host),
      status: StatusCode.PermanentRedirect,
    });
  }
}
