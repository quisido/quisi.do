import { type ExpectationResult } from '@vitest/expect';
import { expect } from 'vitest';

/**
 *   Provides missing `@testing-library/jest-dom` matchers without installing
 * the dependency.
 */

const getVerb = (isNot: boolean): string => {
  if (isNot) {
    return 'should not have';
  }
  return 'should have';
};

expect.extend({
  toHaveAttribute(
    received: HTMLElement,
    attribute: string,
    expectedValue: string | null = null,
  ): ExpectationResult {
    const actualValue: string | null = received.getAttribute(attribute);

    return {
      message: (): string => {
        const verb: string = getVerb(this.isNot);
        return `Element ${verb} ${attribute} ${JSON.stringify(expectedValue)}`;
      },

      pass: actualValue === expectedValue,
    };
  },
});
