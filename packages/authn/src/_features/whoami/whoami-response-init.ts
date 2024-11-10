import { ResponseInitImpl, StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default class WhoAmIResponseInit extends ResponseInitImpl {
  public constructor(worker: AuthnFetchHandler, status: StatusCode) {
    super({
      headers: getWhoAmIResponseHeaders.call(worker),
      status,
    });
  }
}
