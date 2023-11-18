/// <reference types="jest" />
import type { PropertyFilterProps } from '@awsui/components-react/property-filter';
import assert from 'node:assert';
import COMPARISON_OPERATORS from './comparison-operators.js';

const comparisonOperatorsCount: number = COMPARISON_OPERATORS.length;
const PREVIOUS = -1;

describe('Comparison operators', (): void => {
  it('should be sorted by length', (): void => {
    for (let i = 1; i < comparisonOperatorsCount; i++) {
      const operator: PropertyFilterProps.ComparisonOperator | undefined =
        COMPARISON_OPERATORS[i];
      assert(typeof operator !== 'undefined');

      const previousOperator:
        | PropertyFilterProps.ComparisonOperator
        | undefined = COMPARISON_OPERATORS[i + PREVIOUS];
      assert(typeof previousOperator !== 'undefined');

      if (operator.length > previousOperator.length) {
        throw new Error(
          `${operator} should have a shorter length than ${previousOperator}`,
        );
      }
    }
  });
});
