import type { Dispatch } from 'react';
import { useCallback } from 'react';
import type Language from '../constants/language';
import { setLanguage } from '../features/app/app.constant.slice';
import useReduxDispatch from './use-redux-dispatch';

export default function useSetLanguage(): Dispatch<Language> {
  const dispatch = useReduxDispatch();

  return useCallback(
    (language: Language): void => {
      dispatch(setLanguage(language));
    },
    [dispatch],
  );
}
