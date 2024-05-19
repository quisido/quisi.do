import { ErrorCode } from '@quisido/authn-shared';
import { describe, it } from 'vitest';
import fetch from '../test/fetch.js';

describe('handleMissingIsolateEnvironment', (): void => {
  it('should return the correct error code', async (): Promise<void> => {
    const { expectResponseToRedirectTo } = await fetch({});

    const codeStr: string = ErrorCode.MissingIsolateEnvironment.toString();
    expectResponseToRedirectTo(`https://quisi.do/#authn:error=${codeStr}`);
  });
});
