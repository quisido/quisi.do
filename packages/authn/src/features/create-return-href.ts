import { ErrorCode } from '@quisido/authn-shared';
import getRequestSearchParam from '../utils/get-request-search-param.js';
import isObject from '../utils/is-object.js';
import mapCauseToError from '../utils/map-cause-to-error.js';
import getHost from './get-host.js';
import mapStateToReturnPath from './map-state-to-return-path.js';

export default function createReturnHref(): string {
  const host: string = getHost();

  const stateSearchParam: string | null = getRequestSearchParam('state');
  if (stateSearchParam === null) {
    throw mapCauseToError({ code: ErrorCode.MissingState });
  }

  const getStateJson = (): unknown => {
    try {
      return JSON.parse(stateSearchParam);
    } catch (err: unknown) {
      throw mapCauseToError({
        code: ErrorCode.NonJsonState,
        privateData: stateSearchParam,
      });
    }
  };

  const state: unknown = getStateJson();
  if (!isObject(state)) {
    throw mapCauseToError({
      code: ErrorCode.NonObjectState,
      privateData: state,
      publicData: typeof state,
    });
  }

  const returnPath: string = mapStateToReturnPath(state);
  return `https://${host}${returnPath}`;
}
