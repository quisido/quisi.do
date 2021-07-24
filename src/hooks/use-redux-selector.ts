import { useSelector } from 'react-redux';
import type ReduxState from '../types/redux-state';

export default function useReduxSelector<T>(
  selector: (state: Readonly<ReduxState>) => T,
): T {
  return useSelector<ReduxState, T>(selector);
}
