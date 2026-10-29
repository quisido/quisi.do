import { StatusCode } from 'cloudflare-utils';
import RootResponseHeaders from './root-response-headers.js';

export default class RootResponse extends Response {
  public constructor(host: string) {
    super(null, {
      headers: new RootResponseHeaders(host),
      status: StatusCode.PermanentRedirect,
    });
  }
}
