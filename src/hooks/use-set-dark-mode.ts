import type { Dispatch } from 'react';
import { useCallback } from 'react';
import { setDarkMode } from '../features/app/constants/app-slice';
import useReduxDispatch from './use-redux-dispatch';

export default function useSetDarkMode(): Dispatch<boolean> {
  const dispatch = useReduxDispatch();

  return useCallback(
    (isDarkModeEnabled: boolean): void => {
      dispatch(setDarkMode(isDarkModeEnabled));
    },
    [dispatch],
  );
}
