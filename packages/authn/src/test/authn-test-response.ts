import type { ErrorCode } from '@quisido/authn-shared';
import { expectStringMatching } from 'cloudflare-test-utils';
import { StatusCode } from 'cloudflare-utils';
import TestResponse from './test-response.js';

export default class AuthnTestResponse implements TestResponse {
  public readonly expectBodyToBe: TestResponse['expectBodyToBe'];
  public readonly expectHeadersToBe: TestResponse['expectHeadersToBe'];
  public readonly expectNoBody: TestResponse['expectNoBody'];
  public readonly expectOAuthSuccessResponse: () => void;
  public readonly expectStatusCodeToBe: TestResponse['expectStatusCodeToBe'];

  public readonly expectErrorResponse: (
    code: ErrorCode,
    returnPath?: string,
  ) => void;

  public constructor(testResponse: TestResponse) {
    this.expectBodyToBe = testResponse.expectBodyToBe.bind(testResponse);
    this.expectHeadersToBe = testResponse.expectHeadersToBe.bind(testResponse);
    this.expectNoBody = testResponse.expectNoBody.bind(testResponse);
    this.expectStatusCodeToBe =
      testResponse.expectStatusCodeToBe.bind(testResponse);

    this.expectErrorResponse = (code: ErrorCode, returnPath = '/'): void => {
      testResponse.expectNoBody();
      testResponse.expectStatusCodeToBe(StatusCode.SeeOther);

      const codeStr: string = code.toString();
      testResponse.expectHeadersToBe({
        'access-control-allow-methods': 'GET',
        allow: 'GET',
        'content-location': `https://host.test.quisi.do${returnPath}#authn:error=${codeStr}`,
        location: `https://host.test.quisi.do${returnPath}#authn:error=${codeStr}`,
      });
    };

    this.expectOAuthSuccessResponse = (): void => {
      testResponse.expectNoBody();
      testResponse.expectStatusCodeToBe(StatusCode.SeeOther);
      testResponse.expectHeadersToBe({
        'content-location': `https://host.test.quisi.do/test-return-path/`,
        location: `https://host.test.quisi.do/test-return-path/`,
        'set-cookie': expectStringMatching(
          /^__Secure-Authentication-ID=.{64}; Domain=quisi.do; Max-Age=86400; Partitioned; Path=\/; SameSite=Lax; Secure$/u,
        ),
      });
    };
  }
}
