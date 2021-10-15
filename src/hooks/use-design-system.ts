import type DesignSystem from '../constants/design-system';
import type ReduxState from '../types/redux-state';
import useReduxSelector from './use-redux-selector';

export default function useDesignSystem(): DesignSystem {
  return useReduxSelector(
    (state: Readonly<ReduxState>): DesignSystem => state.app.designSystem,
  );
}
