import mapObjectToDependencyArray from './map-object-to-dependency-array';

const TEST_NUMBER = 789;
const TEST_NUMBER_PROPERTY_KEY = 123;
const TEST_NUMBER_PROPERTY_VALUE = 456;
const TEST_SYMBOL_PROPERTY_KEY = Symbol('test-key');
const TEST_SYMBOL_PROPERTY_VALUE = Symbol('test-value');

describe('mapObjectToDependencyArray', (): void => {
  it('should return sorted object keys and values', (): void => {
    expect(
      mapObjectToDependencyArray({
        [TEST_NUMBER_PROPERTY_KEY]: TEST_NUMBER_PROPERTY_VALUE,
        [TEST_SYMBOL_PROPERTY_KEY]: TEST_SYMBOL_PROPERTY_VALUE,
        bool: true,
        num: TEST_NUMBER,
        str: 'test-string',
      }),
    ).toEqual([
      '123',
      TEST_NUMBER_PROPERTY_VALUE,
      'bool',
      true,
      'num',
      TEST_NUMBER,
      'str',
      'test-string',
    ]);
  });
});
