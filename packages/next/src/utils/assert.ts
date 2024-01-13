import EMPTY_ARRAY from '../constants/empty-array.js';

const NONE = 0;

export default function assert(
  assertion: boolean,
  value: unknown,
  type: string,
  context: readonly string[] = EMPTY_ARRAY,
): asserts assertion {
  if (assertion) {
    return;
  }

  const typeOfValue = `${typeof value} ${JSON.stringify(value)}`;
  if (context.length === NONE) {
    throw new Error(`Expected ${type}, but received ${typeOfValue}`);
  }

  const property: string = context.join('.');
  throw new Error(
    `Expected property "${property}" to be ${type}, but received ${typeOfValue}`,
  );
}
