import type { WhoAmIResponseCode } from '@quisido/authn-shared';
import { StatusCode } from 'cloudflare-utils';
import WhoAmIResponseInit from './whoami-response-init.js';

interface Options {
  readonly accessControlAllowOrigin: string;
  readonly code: WhoAmIResponseCode;
  readonly id?: number | undefined;
  readonly status?: StatusCode | undefined;
}

export default class WhoAmIResponse extends Response {
  public constructor({
    accessControlAllowOrigin,
    code,
    id,
    status = StatusCode.OK,
  }: Options) {
    super(
      JSON.stringify({
        code,
        id,
      }),
      new WhoAmIResponseInit(status, { accessControlAllowOrigin }),
    );
  }
}
