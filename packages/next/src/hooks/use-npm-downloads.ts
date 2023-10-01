import { MutableRefObject, useRef } from 'react';
import mapUnknownToString from 'unknown2string';
import RetryAction from '../components/retry-action';
import useNotify from '../hooks/use-notify';
import type { AsyncState } from '../modules/use-async-state';
import useAsyncState from '../modules/use-async-state';

/**
 * Technical debt: This is currently called twice, when it should only be called
 *   once. `packages.hook` needs it to render the packages to the /packages/
 *   page, but the packages page's `use-wrapper-props` hook also calls this in
 *   order to display errors as a banner notification.
 * This is an unnecessary network request. 😢
 */

interface BaseState {
  readonly asyncErrorActionRef: MutableRefObject<unknown>;
}

type State = AsyncState<Readonly<Record<string, readonly number[]>>> &
  BaseState;

const getNpmDownloads = async (): Promise<
  Readonly<Record<string, readonly number[]>>
> => {
  const response: Response = await window.fetch(
    process.env.REACT_APP_NPM_DOWNLOADS ??
      'https://npm.cscdn.net/charlesstover.json',
  );

  return response.json();
};
export default function useNpmDownloads(): State {
  // Contexts
  const notify = useNotify();

  // States
  const asyncErrorActionRef: MutableRefObject<unknown> = useRef();

  const asyncState = useAsyncState(getNpmDownloads, (err: string): void => {
    notify({
      CallToAction: RetryAction,
      message: mapUnknownToString(err),
      type: 'error',
      onAction: (): void => {
        asyncErrorActionRef.current = asyncState.retry();
      },
    });
  });

  return {
    ...asyncState,
    asyncErrorActionRef,
  };
}
