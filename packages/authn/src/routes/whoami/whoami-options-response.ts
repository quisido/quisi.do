import Worker from '@quisido/worker';
import { StatusCode } from 'cloudflare-utils';
import WhoAmIResponseInit from './whoami-response-init.js';

export default class WhoAmIOptionsResponse extends Response {
  public constructor(worker: Worker) {
    super(null, new WhoAmIResponseInit(worker, StatusCode.OK));
  }
}
