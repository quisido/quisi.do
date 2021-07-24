import type ReduxState from '../types/redux-state';
import useReduxSelector from './use-redux-selector';

export default function useDarkMode(): boolean {
  return useReduxSelector(
    (state: Readonly<ReduxState>): boolean => state.app.isDarkModeEnabled,
  );
}
