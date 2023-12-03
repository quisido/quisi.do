import { type MutableRefObject, useEffect, useRef } from 'react';
import mapUnknownToString from 'unknown2string';
import RetryAction from '../components/retry-action';
import useNotify from '../hooks/use-notify';
import useAsyncState, { type AsyncState } from '../modules/use-async-state';

/**
 * Technical debt: This is currently called twice, when it should only be called
 *   once. `packages.hook` needs it to render the packages to the /packages/
 *   page, but the packages page's `use-wrapper-props` hook also calls this in
 *   order to display errors as a banner notification.
 * This is an unnecessary network request. 😢
 */

interface BaseState {
  readonly asyncRetryRef: MutableRefObject<Promise<unknown> | undefined>;
}

type State = AsyncState<Readonly<Record<string, readonly number[]>>> &
  BaseState;

const getNpmDownloads = async (): Promise<
  Readonly<Record<string, readonly number[]>>
> => {
  const response: Response = await window.fetch(
    process.env.NPM_DOWNLOADS ?? 'https://npm.cscdn.net/charlesstover.json',
  );

  return response.json();
};

export default function useNpmDownloads(): State {
  // Contexts
  const notify = useNotify();

  // States
  const { request, retry, ...asyncState } =
    useAsyncState<Readonly<Record<string, readonly number[]>>>();

  const asyncRetryRef: MutableRefObject<Promise<unknown> | undefined> =
    useRef();

  useEffect((): void => {
    request(getNpmDownloads).catch((err: string): void => {
      notify({
        CallToAction: RetryAction,
        message: mapUnknownToString(err),
        type: 'error',
        onAction: (): void => {
          asyncRetryRef.current = retry();
        },
      });
    });
  }, [request, retry]);

  return {
    ...asyncState,
    asyncRetryRef,
    request,
    retry,
  };
}
