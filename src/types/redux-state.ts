import type reduxStore from '../constants/redux-store';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type ReduxState = ReturnType<typeof reduxStore.getState>;

export default ReduxState;
