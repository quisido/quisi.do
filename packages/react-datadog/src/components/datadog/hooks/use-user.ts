import type { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';
import useDatadogRum from '../../../hooks/use-datadog-rum';
import useShallowMemo from '../../../hooks/use-shallow-memo';
import type User from '../../../types/user';
import isUndefined from '../utils/is-undefined';

const DEFAULT_USER: Readonly<User> = Object.freeze({});

export default function useUser(user: Readonly<User> = DEFAULT_USER): void {
  // Contexts
  const rum: typeof datadogRum = useDatadogRum();

  // States
  const userMemo: User = useShallowMemo(user);

  // Effects
  useEffect((): VoidFunction | undefined => {
    if (Object.values(userMemo).every(isUndefined)) {
      return;
    }

    rum.setUser(userMemo);
    return (): void => {
      rum.removeUser();
    };
  }, [rum, userMemo]);
}
