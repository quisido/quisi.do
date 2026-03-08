import { type MetricDimensions } from '@quisido/worker';

export type ExpectedType = 'boolean' | 'number' | 'string';

const validateDimensions = (
  dimensions: MetricDimensions,
  schema: Readonly<Record<string, ExpectedType>>,
): boolean =>
  Object.entries(schema).every(
    ([key, expectedType]) => typeof dimensions[key] === expectedType,
  );

export default validateDimensions;
