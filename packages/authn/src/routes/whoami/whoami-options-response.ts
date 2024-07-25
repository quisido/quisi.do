import { StatusCode } from 'cloudflare-utils';
import WhoAmIResponseInit from './whoami-response-init.js';

export default class WhoAmIOptionsResponse extends Response {
  public constructor() {
    super(null, new WhoAmIResponseInit(StatusCode.OK));
  }
}
