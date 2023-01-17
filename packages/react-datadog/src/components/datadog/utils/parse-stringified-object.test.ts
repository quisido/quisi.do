import OBJECT_TYPE_ERROR from '../constants/object-type-error';
import parseStringifiedObject from './parse-stringified-object';

describe('parseStringifiedObject', (): void => {
  it('should throw an error for stringified non-objects', (): void => {
    expect((): void => {
      parseStringifiedObject('null');
    }).toThrowError(OBJECT_TYPE_ERROR);
  });

  it('should return the parsed object', (): void => {
    expect(parseStringifiedObject('{"a":true,"b":1,"c":"str"}')).toEqual({
      a: true,
      b: 1,
      c: 'str',
    });
  });
});
