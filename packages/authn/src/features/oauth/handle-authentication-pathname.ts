import { catchSnapshot, getRequestSearchParam } from '../../constants/worker.js';
import { AuthenticationPathname } from './authentication-pathname.js';
import handleMissingStateSearchParam from './handle-missing-state-search-param.js';
import handleNonJsonStateSearchParam from './handle-non-json-state-search-param.js';
import handleState from './handle-state.js';

export default async function handleAuthenticationPathname(
  pathname: AuthenticationPathname,
): Promise<Response> {
  const stateSearchParam: string | null = getRequestSearchParam('state');
  if (stateSearchParam === null) {
    return handleMissingStateSearchParam();
  }

  return await catchSnapshot(
    async (): Promise<Response> => {
      const state: unknown = JSON.parse(stateSearchParam);
      return await handleState({
        pathname,
        state,
        stateSearchParam,
      });
    },
    (): Response => {
      return handleNonJsonStateSearchParam(stateSearchParam);
    },
  );
}
