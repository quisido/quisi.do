import MISSING_CONTAINER_ERROR from '../constants/missing-container-error';
import getContainer from './get-container';

describe('getContainer', (): void => {
  it('should throw an error if the container does not exist', (): void => {
    expect((): void => {
      getContainer();
    }).toThrowError(MISSING_CONTAINER_ERROR);
  });
});
