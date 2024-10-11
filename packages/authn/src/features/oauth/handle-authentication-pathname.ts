import type Worker from '@quisido/worker';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleMissingStateSearchParam from './handle-missing-state-search-param.js';
import handleNonJsonStateSearchParam from './handle-non-json-state-search-param.js';
import handleState from './handle-state.js';

export default async function handleAuthenticationPathname(
  this: Worker,
  pathname: AuthenticationPathname,
): Promise<Response> {
  const stateSearchParam: string | null = this.getRequestSearchParam('state');
  if (stateSearchParam === null) {
    return handleMissingStateSearchParam.call(this);
  }

  return await this.catchSnapshot(
    async (): Promise<Response> => {
      const state: unknown = JSON.parse(stateSearchParam);
      return await handleState.call(this, {
        pathname,
        state,
        stateSearchParam,
      });
    },
    (): Response => {
      return handleNonJsonStateSearchParam.call(this, stateSearchParam);
    },
  );
}
