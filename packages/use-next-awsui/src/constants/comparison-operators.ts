import type { PropertyFilterProps } from '@awsui/components-react/property-filter';

const COMPARISON_OPERATORS: readonly PropertyFilterProps.ComparisonOperator[] =
  ['>=', '<=', '!:', '!=', ':', '>', '<', '='] as const;

export default COMPARISON_OPERATORS;
