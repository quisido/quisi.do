import { type ExpectationResult } from '@vitest/expect';
import { toString } from 'fmrs';
import { expect } from 'vitest';

/**
 * Provides missing `@testing-library/jest-dom` matchers without installing
 * the dependency.
 */

const getPassingVerb = (isNot: boolean): string => {
  if (isNot) {
    return 'does not have';
  }
  return 'has';
};

expect.extend({
  toHaveAttribute(
    received: HTMLElement,
    attribute: string,
    expectedValue: string | null | undefined = expect.any(String) as string,
  ): ExpectationResult {
    const actualValue: string | null = received.getAttribute(attribute);

    try {
      /**
       * This format allows `expect.any(String) as string`, because
       * `expect.any`'s return type is not known to type the `expectedValue`
       * parameter.
       */
      expect(actualValue).toStrictEqual(expectedValue);
      return {
        message: (): string => {
          const verb: string = getPassingVerb(this.isNot);
          return `Element ${verb} attribute "${attribute}" with value "${JSON.stringify(expectedValue)}"`;
        },
        pass: true,
      };
    } catch (err: unknown) {
      return {
        message: (): string => {
          return toString(err);
        },
        pass: false,
      };
    }
  },
});
