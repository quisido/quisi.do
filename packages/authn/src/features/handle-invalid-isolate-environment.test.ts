import { ErrorCode } from '@quisido/authn-shared';
import fetch from '../test/fetch.js';

describe('handleInvalidIsolateEnvironment', (): void => {
  it('should return the correct error code', async (): Promise<void> => {
    const { expectResponseToRedirectTo } = await fetch({
      env: true,
    });

    expectResponseToRedirectTo(
      `https://quisi.do/#authn:error=${ErrorCode.InvalidIsolateEnvironment}`,
    );
  });
});
