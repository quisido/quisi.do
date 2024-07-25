import { StatusCode } from 'cloudflare-utils';
import ResponseInitImpl from '../../utils/response-init.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default class WhoAmIResponseInit extends ResponseInitImpl {
  public constructor(status: StatusCode) {
    super({
      headers: getWhoAmIResponseHeaders(),
      status,
    });
  }
}
