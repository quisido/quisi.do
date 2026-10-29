import { describe, expect, it } from 'vitest';
import getContainer from './get-container.js';

describe('getContainer', (): void => {
  it('should throw an error if the container does not exist', (): void => {
    expect((): void => {
      getContainer();
    }).toThrow('Expected a DOM element with an ID of "root".');
  });
});
