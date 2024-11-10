import type { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import type AuthnFetchHandler from '../../authn-fetch-handler.js';
import WhoAmIResponseInit from './whoami-response-init.js';

interface Options {
  readonly code: WhoAmIResponseCode;
  readonly id?: number | undefined;
  readonly status?: StatusCode | undefined;
}

export default class WhoAmIResponse extends Response {
  public constructor(
    worker: AuthnFetchHandler,
    { code, id, status = StatusCode.OK }: Options,
  ) {
    super(
      JSON.stringify({
        code,
        id,
      }),
      new WhoAmIResponseInit(worker, status),
    );
  }
}
