import { useDispatch } from 'react-redux';
import type ReduxDispatch from '../types/redux-dispatch';

export default function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
