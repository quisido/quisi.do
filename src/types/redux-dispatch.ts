import type reduxStore from '../constants/redux-store';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type ReduxDispatch = typeof reduxStore.dispatch;

export default ReduxDispatch;
