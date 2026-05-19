import EMPTY_ARRAY from '../constants/empty-array.js';

const NONE = 0;

const mapValueToTypeOfValue = (value: unknown): string => {
  const typeOf: string = typeof value;
  if (typeOf === 'undefined') {
    return 'undefined';
  }

  return `${typeOf} ${JSON.stringify(value)}`;
};

export default function assert(
  assertion: boolean,
  value: unknown,
  type: string,
  context: readonly string[] = EMPTY_ARRAY,
): asserts assertion {
  if (assertion) {
    return;
  }

  const typeOfValue: string = mapValueToTypeOfValue(value);
  if (context.length === NONE) {
    throw new Error(`Expected ${type}, but received ${typeOfValue}.`);
  }

  const property: string = context.join('.');
  throw new Error(
    `Expected property "${property}" to be ${type}, but received ${typeOfValue}.`,
  );
}
