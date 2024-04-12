import ErrorCode from '../constants/error-code.js';
import fetch from '../test/fetch.js';

describe('handleMissingIsolateEnvironment', (): void => {
  it('should return the correct error code', async (): Promise<void> => {
    const { expectResponseToRedirectTo } = await fetch({});

    expectResponseToRedirectTo(
      `https://quisi.do/#authn:error=${ErrorCode.MissingIsolateEnvironment}`,
    );
  });
});
