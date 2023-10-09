import {
  type MutableRefObject,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import useAsyncState from '../../modules/use-async-state';
import type Fetch from './types/fetch';
import type ApiTokenStatus from './types/api-token-status';
import useEffectEvent from '../../hooks/use-effect-event';
import isRunnable from './utils/is-runnable';
import DEFAULT_STATE from './constants/default-state';
import type Model from './constants/model';
import type ModelState from './types/model-state';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import mapModelToInitialInputs from './utils/map-model-to-initial-inputs';

interface State<S extends ModelState> {
  readonly apiToken: string;
  readonly apiTokenStatus: ApiTokenStatus;
  readonly asyncRunEffect: MutableRefObject<Promise<unknown> | undefined>;
  readonly handleRunClick: () => void;
  readonly handleApiTokenChange: (token: string) => void;
  readonly handleFormChange: (inputs: S['inputs']) => void;
  readonly handleModelChange: (model: Model) => void;
  readonly inputs: S['inputs'];
  readonly model: S['model'];
  readonly result: string;
}

export default function useCloudflareWorkersAi<S extends ModelState>(
  onFetch: Fetch,
): State<S> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const [apiToken, setApiToken] = useState('');

  /**
   * Even though `S` isn't required to be a Translation model, we know that
   *   `DEFAULT_STATE` is `S` because this is where `S` is instantiated.
   */
  const [modelState, setModelState] = useState<S>(DEFAULT_STATE as S);

  const asyncRunEffect: MutableRefObject<Promise<unknown> | undefined> =
    useRef();

  const { data, error, initiated, loading, request } = useAsyncState();
  const {
    data: verifyTokenData,
    error: verifyTokenError,
    initiated: isVerifyTokenInitiated,
    loading: isVerifyTokenLoading,
    request: requestTokenVerification,
  } = useAsyncState();

  useEffect((): void => {
    if (apiToken === '') {
      return;
    }

    requestTokenVerification(async (): Promise<unknown> => {
      const response: Response = await window.fetch(
        'https://api.cloudflare.com/client/v4/user/tokens/verify',
        {
          method: 'GET',
          mode: 'cors',
          headers: new Headers({
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          }),
        },
      );

      /**
       * {
          "errors": [],
          "messages": [],
          "result": {
            "expires_on": "2020-01-01T00:00:00Z",
            "id": "ed17574386854bf78a67040be0a770b0",
            "not_before": "2018-07-01T05:20:00Z",
            "status": "active"
          },
          "success": true
        }
       * {
       *   "success":false,
       *   "messages": [],
       *   "result": null,
       *   "errors": [
       *     {
       *       "code": 1001,
       *       "message": "Missing \"Authorization\" header",
       *     }
       *   ],
       * }
       */
      const json: unknown = await response.json();
      return json;
    });
  }, [apiToken]);

  return {
    ...modelState,
    apiToken,
    asyncRunEffect,
    handleApiTokenChange: setApiToken,
    result: JSON.stringify(data, null, 2),

    apiTokenStatus: useMemo((): ApiTokenStatus => {
      if (!isVerifyTokenInitiated) {
        return {
          status: 'uninitiated',
        };
      }

      if (isVerifyTokenLoading) {
        return {
          status: 'loading',
        };
      }

      if (typeof verifyTokenError !== 'undefined') {
        return {
          status: 'error',
          message: verifyTokenError,
        };
      }

      return {
        status: 'success',
        data: verifyTokenData,
      };
    }, [
      isVerifyTokenInitiated,
      isVerifyTokenLoading,
      verifyTokenData,
      verifyTokenError,
    ]),

    handleFormChange: useEffectEvent((inputs: S['inputs']): void => {
      setModelState(
        (oldModelState: S): S => ({
          ...oldModelState,
          inputs,
        }),
      );
    }),

    handleModelChange: useEffectEvent((model: Model): void => {
      setModelState({
        inputs: mapModelToInitialInputs(model),
        model,
      } as S);
    }),

    handleRunClick: useEffectEvent((): void => {
      if (!isRunnable(modelState)) {
        return;
      }

      const run = async (): Promise<unknown> =>
        await onFetch(apiToken, modelState);

      asyncRunEffect.current = request(run);
    }),
  };
}
