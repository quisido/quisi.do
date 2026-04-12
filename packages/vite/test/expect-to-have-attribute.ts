import { type ExpectationResult } from '@vitest/expect';
import { expect } from 'vitest';

/**
 *   Provides missing `@testing-library/jest-dom` matchers without installing
 * the dependency.
 */
expect.extend({
  toHaveAttribute(
    received: HTMLElement,
    attribute: string,
    value: string,
  ): ExpectationResult {
    return {
      message: (): string => {
        const verb = ((): string => {
          if (this.isNot) {
            return 'does not have';
          }
          return 'has';
        })();

        return `Element ${verb} attribute ${attribute} with value ${value}`;
      },
      pass: received.getAttribute(attribute) === value,
    };
  },
});
