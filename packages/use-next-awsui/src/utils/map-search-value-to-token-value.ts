import COMPARISON_OPERATORS from '../constants/comparison-operators.js';

export default function mapSearchValueToTokenValue(value: string): string {
  for (const operator of COMPARISON_OPERATORS) {
    if (value.startsWith(operator)) {
      return value.substring(operator.length);
    }
  }

  return value;
}
