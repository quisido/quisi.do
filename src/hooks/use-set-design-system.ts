import type { Dispatch } from 'react';
import { useCallback } from 'react';
import type DesignSystem from '../constants/design-system';
import { setDesignSystem } from '../features/app/app.constant.slice';
import useReduxDispatch from './use-redux-dispatch';

export default function useSetDesignSystem(): Dispatch<DesignSystem> {
  const dispatch = useReduxDispatch();

  return useCallback(
    (designSystem: DesignSystem): void => {
      dispatch(setDesignSystem(designSystem));
    },
    [dispatch],
  );
}
