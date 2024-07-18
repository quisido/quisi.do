import { describe, expect, it } from 'vitest';
import RequiredVariable from './required-variable.js';

describe('RequiredVariable', (): void => {
  it('should throw an error when a value does not exist', (): void => {
    const variable = new RequiredVariable({
      name: 'test',
    });

    expect((): void => {
      variable.get();
    }).toThrow('Variable "test" is not defined.');
  });

  it('should return values when set', (): void => {
    const variable = new RequiredVariable({
      name: 'test',
    });

    variable.run('test value', (): void => {
      expect(variable.get()).toBe('test value');
    });
  });
});
