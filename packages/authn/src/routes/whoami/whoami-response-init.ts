import Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import ResponseInitImpl from '../../utils/response-init.js';
import getWhoAmIResponseHeaders from './get-whoami-response-headers.js';

export default class WhoAmIResponseInit extends ResponseInitImpl {
  public constructor(worker: Worker, status: StatusCode) {
    super({
      headers: getWhoAmIResponseHeaders.call(worker),
      status,
    });
  }
}
