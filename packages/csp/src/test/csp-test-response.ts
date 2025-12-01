import { type TestResponse } from '@quisido/worker-test';

export default class AuthnTestResponse implements TestResponse {
  public readonly expectBodyToBe: TestResponse['expectBodyToBe'];
  public readonly expectHeaderToBe: TestResponse['expectHeaderToBe'];
  public readonly expectHeadersToBe: TestResponse['expectHeadersToBe'];
  public readonly expectNoBody: TestResponse['expectNoBody'];
  public readonly expectStatusCodeToBe: TestResponse['expectStatusCodeToBe'];

  public constructor(testResponse: TestResponse) {
    this.expectBodyToBe = testResponse.expectBodyToBe.bind(testResponse);
    this.expectHeaderToBe = testResponse.expectHeaderToBe.bind(testResponse);
    this.expectHeadersToBe = testResponse.expectHeadersToBe.bind(testResponse);
    this.expectNoBody = testResponse.expectNoBody.bind(testResponse);
    this.expectStatusCodeToBe =
      testResponse.expectStatusCodeToBe.bind(testResponse);
  }
}
