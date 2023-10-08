import type { PropertyFilterProps } from '@awsui/components-react/property-filter';
import COMPARISON_OPERATORS from '../constants/comparison-operators.js';

export default function mapSearchValueToTokenOperator(
  value: string,
): PropertyFilterProps.ComparisonOperator {
  for (const operator of COMPARISON_OPERATORS) {
    if (value.startsWith(operator)) {
      return operator;
    }
  }

  return '=';
}
