import { setUser } from '@sentry/react';

export default function useSetUser(): typeof setUser {
  return setUser;
}
