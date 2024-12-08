import { expect } from 'vitest';
import expectTextToBe from './expect-text-to-be.js';
import mapHeadersToRecord from './map-headers-to-record.js';

export default class TestResponse {
  public static async from(response: Response): Promise<TestResponse> {
    const text: string = await response.text();
    return new TestResponse(response, text);
  }

  public readonly expectHeaderToBe: (header: string, value: string) => void;
  public readonly expectHeadersToBe: (headers: Record<string, string>) => void;
  public readonly expectNoBody: () => void;
  public readonly expectStatusCodeToBe: (code: number) => void;

  public readonly expectBodyToBe: (
    body: Record<string, boolean | number | string> | string,
  ) => void;

  private constructor(response: Response, text: string) {
    this.expectBodyToBe = expectTextToBe.bind(null, text);

    this.expectHeaderToBe = (header: string, expected: string): void => {
      const actual: string | null = response.headers.get(header);
      expect(actual).toBe(expected);
    };

    this.expectHeadersToBe = (expected: Record<string, string>): void => {
      const actual: Record<string, string> = mapHeadersToRecord(
        response.headers,
      );
      expect(actual).toEqual(expected);
    };

    this.expectNoBody = (): void => {
      expect(text).toBe('');
    };

    this.expectStatusCodeToBe = (code: number): void => {
      expect(response.status).toBe(code);
    };
  }
}
