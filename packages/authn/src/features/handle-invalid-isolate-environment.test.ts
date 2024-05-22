import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import fetch from '../test/fetch.js';

describe('handleInvalidIsolateEnvironment', (): void => {
  it('should return the correct error code', async (): Promise<void> => {
    const { expectResponseToRedirectTo } = await fetch({
      env: true,
    });

    const codeStr: string = ErrorCode.InvalidIsolateEnvironment.toString();
    expectResponseToRedirectTo(`https://quisi.do/#authn:error=${codeStr}`);
  });
});
