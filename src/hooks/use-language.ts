import type Language from '../constants/language';
import type ReduxState from '../types/redux-state';
import useReduxSelector from './use-redux-selector';

export default function useLanguage(): Language {
  return useReduxSelector(
    (state: Readonly<ReduxState>): Language => state.app.language,
  );
}
